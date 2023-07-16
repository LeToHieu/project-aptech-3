using MediaWebApi.Models;
using MediaWebApi.Repositories;

namespace MediaWebApi.Services
{
    public class ArtistAlbumService : IArtistAlbumService
    {
        private readonly ArtistAlbumRepository _artistAlbumRepository;
        public ArtistAlbumService(ArtistAlbumRepository artistAlbumRepository)
        {
            _artistAlbumRepository = artistAlbumRepository;
        }
        public async Task<ArtistAlbum?> CreateAsync(ArtistAlbum artistAlbum)
        {
            return await _artistAlbumRepository.CreateAsync(artistAlbum);
        }

        public async Task<bool?> DeleteAsync(ArtistAlbum artistAlbum)
        {
            return await _artistAlbumRepository.DeleteAsync(artistAlbum);
        }

        public async Task<List<ArtistAlbum?>?> GetAllAsync()
        {
            return await _artistAlbumRepository.GetAllAsync();

        }

        public async Task<List<ArtistAlbum?>?> GetAllWithArtistsAndAlbumsAsync()
        {
            return await _artistAlbumRepository.GetAllWithArtistsAndAlbumsAsync();
        }
    }
}
