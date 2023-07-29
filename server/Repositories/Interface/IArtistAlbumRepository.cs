using MediaWebApi.Models;

namespace MediaWebApi.Repositories.Interface
{
    public interface IArtistAlbumRepository
    {
        Task<List<ArtistAlbum>> GetAllAsync();

        Task<List<ArtistAlbum>> GetAllWithArtistsAndAlbumsAsync();

        Task<ArtistAlbum> CreateAsync(ArtistAlbum artistAlbum);

        Task<bool> DeleteAsync(ArtistAlbum artistAlbum);
    }
}
