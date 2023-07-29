using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class ArtistRepository : IArtistRepository
    {
        private readonly MediaContext _context;

        public ArtistRepository(MediaContext context) 
        { 
            _context= context;
        }
        public async Task<Artist?> CreateArtist(ArtistViewModel artist)
        {
            string sql = "EXECUTE InsertArtist @artist_name, @description";
            IEnumerable<Artist> result = await _context.Artists.FromSqlRaw(sql,
                                    new SqlParameter("@artist_name", artist.ArtistName),
                                    new SqlParameter("@description", artist.Description)
                                ).ToListAsync();

            Artist? newArtist = result.FirstOrDefault();
            if (newArtist == null)
            {
                throw new ArgumentException("Can not create category");
            }
            return newArtist;
        }

        public async Task<bool?> DeleteArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
            {
                return null;
            }

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Artist?> GetArtistById(int id)
        {
            var existingArtist =  await _context.Artists.FindAsync(id);
            if (existingArtist == null)
            {
                throw new ArgumentException("Id not found");
            }
            return existingArtist;
        }

        public async Task<List<Artist?>?> GetArtists()
        {
            List<Artist> artists = await _context.Artists.ToListAsync();
            return artists;
        }

        public async Task<bool?> UpdateArtist(Artist artist)
        {
            string sql = "EXECUTE UpdateArtist @Id, @@artist_name, @description";
            IEnumerable<Category> result = await _context.Categories.FromSqlRaw(sql,
                                    new SqlParameter("@Id", artist.Id),
                                    new SqlParameter("@artist_name", artist.ArtistName),
                                    new SqlParameter("@description", artist.Description)
                                ).ToListAsync();

            Category? updated = result.FirstOrDefault();
            if (updated == null)
            {
                return false;
            }

            return true;
        }
    }
}
