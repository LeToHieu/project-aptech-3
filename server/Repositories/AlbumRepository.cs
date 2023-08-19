using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly MediaContext _context;
        public AlbumRepository (MediaContext context)
        {
            _context = context;
        }
        public async Task<Album?> CreateAlbum(AlbumViewModel album)
        {
            string sql = "EXECUTE InsertAlbum @album_name, @price, @description";
            IEnumerable<Album> result = await _context.Albums.FromSqlRaw(sql,
                                    new SqlParameter("@album_name", album.AlbumName),
                                    new SqlParameter("@price", album.Price),
                                    new SqlParameter("@description", album.Description)
                                ).ToListAsync();

            Album? newAlbum = result.FirstOrDefault();
            if (newAlbum == null)
            {
                throw new ArgumentException("Can not create album");
            }
            return newAlbum;
        }

        public async Task<bool?> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
            {
                return null;
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Album?> GetAlbumById(int id)
        {
            var existingAlbum = await _context.Albums.FindAsync(id);
            if (existingAlbum == null)
            {
                throw new ArgumentException("Id not found");
            }
            return existingAlbum;
        }

        public async Task<List<Album?>?> GetAllAlbums()
        {
            List<Album> albums = await _context.Albums.Include(a => a.Artists).ThenInclude(a=>a.Artist).ToListAsync();
            return albums;
        }

        public async Task<bool?> UpdateAlbum(Album album)
        {
            string sql = "EXECUTE UpdateAlbum @id, @album_name, @price, @description";
            IEnumerable<Album> result = await _context.Albums.FromSqlRaw(sql,
                                    new SqlParameter("@Id", album.Id),
                                    new SqlParameter("@album_name", album.AlbumName),
                                    new SqlParameter("@price", album.Price),
                                    new SqlParameter("@description", album.Description)
                                ).ToListAsync();

            Album? newAlbum = result.FirstOrDefault();
            if (newAlbum == null)
            {
                return false;
            }
            return true;
        }
    }
}
