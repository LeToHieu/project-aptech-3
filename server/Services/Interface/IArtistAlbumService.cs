using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IArtistAlbumService
    {
        Task<List<ArtistAlbum?>?> GetAllAsync();

        Task<List<ArtistAlbum?>?> GetAllWithArtistsAndAlbumsAsync();

        Task<ArtistAlbum?> CreateAsync(ArtistAlbumViewModel artistAlbum);

        Task<bool?> DeleteAsync(ArtistAlbumViewModel artistAlbum);
    }
}
