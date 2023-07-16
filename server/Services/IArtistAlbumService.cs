using MediaWebApi.Models;

namespace MediaWebApi.Services
{
    public interface IArtistAlbumService
    {
        Task<List<ArtistAlbum?>?> GetAllAsync();

        Task<List<ArtistAlbum?>?> GetAllWithArtistsAndAlbumsAsync();

        Task<ArtistAlbum?> CreateAsync(ArtistAlbum artistAlbum);

        Task<bool?> DeleteAsync(ArtistAlbum artistAlbum);
    }
}
