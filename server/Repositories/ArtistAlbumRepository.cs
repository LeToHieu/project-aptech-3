using MediaWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class ArtistAlbumRepository : IArtistAlbumRepository
    {
        private readonly MediaContext _context;
        public ArtistAlbumRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<ArtistAlbum> CreateAsync(ArtistAlbum artistAlbum)
        {
            var artist = await _context.ArtistAlbums.FindAsync(artistAlbum.ArtistId, artistAlbum.AlbumId);

            if (artist == null)
            {
                artist = new ArtistAlbum
                {
                    ArtistId = artistAlbum.ArtistId,
                    AlbumId = artistAlbum.AlbumId,
                };
            }else
            {
                throw new ArgumentException("exsist");
            }
            _context.ArtistAlbums.Add(artist);
            await _context.SaveChangesAsync();
            return artist;
        }

        public async Task<bool> DeleteAsync(ArtistAlbum artistAlbum)
        {
            ArtistAlbum? artist = await _context.ArtistAlbums.FindAsync(artistAlbum.ArtistId, artistAlbum.AlbumId);
            if (artist != null)
            {
                _context.Set<ArtistAlbum>().Remove(artist);
                await _context.SaveChangesAsync();

                return true;
            }
            return false;
        }

        public async Task<List<ArtistAlbum>> GetAllAsync()
        {
            return await _context.Set<ArtistAlbum>().ToListAsync();
        }

        public async Task<List<ArtistAlbum>> GetAllWithArtistsAndAlbumsAsync()
        {
            return await _context.Set<ArtistAlbum>()
                                    .Include(aa => aa.Artist)
                                    .Include(aa => aa.Album)
                                    .ToListAsync();
        }
    }
}
