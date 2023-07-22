using MediaWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class ArtistMediaRepository : IArtistMediaRepository
    {
        private readonly MediaContext _context;
        public ArtistMediaRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<ArtistMedia> CreateAsync(ArtistMedia artistMedia)
        {
            var artist = await _context.ArtistMedias.FindAsync(artistMedia.ArtistId, artistMedia.MediaId);

            if (artist == null)
            {
                artist = new ArtistMedia
                {
                    ArtistId = artistMedia.ArtistId,
                    MediaId = artistMedia.MediaId,
                };
            }
            else
            {
                throw new ArgumentException("exsist");
            }
            _context.ArtistMedias.Add(artist);
            await _context.SaveChangesAsync();
            return artist;
        }

        public async Task<bool> DeleteAsync(ArtistMedia artistMedia)
        {
            ArtistMedia? artist = await _context.ArtistMedias.FindAsync(artistMedia.ArtistId, artistMedia.MediaId);
            if (artist != null)
            {
                _context.Set<ArtistMedia>().Remove(artist);
                await _context.SaveChangesAsync();

                return true;
            }
            return false;
        }

        public async Task<List<ArtistMedia>> GetAllAsync()
        {
            return await _context.Set<ArtistMedia>().ToListAsync();
        }

        public async Task<List<ArtistMedia>> GetAllWithArtistsAndMediasAsync()
        {
            return await _context.Set<ArtistMedia>()
                                    .Include(aa => aa.Artist)
                                    .Include(aa => aa.Media)
                                    .ToListAsync();
        }
    }
}
