using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IArtistAlbumRepository
    {
        Task<List<ArtistAlbum>> GetAllAsync();

        Task<List<ArtistAlbum>> GetAllWithArtistsAndAlbumsAsync();

        Task<ArtistAlbum> CreateAsync(ArtistAlbumViewModel artistAlbum);

        Task<bool> DeleteAsync(ArtistAlbumViewModel artistAlbum);
    }
}
