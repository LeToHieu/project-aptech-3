using MediaWebApi.Models;

namespace MediaWebApi.Repositories
{
    public interface IArtistAlbumRepository
    {
        Task<List<ArtistAlbum>> GetAllAsync();

        Task<List<ArtistAlbum>> GetAllWithArtistsAndAlbumsAsync();

        Task<ArtistAlbum> CreateAsync(ArtistAlbum artistAlbum);

        Task<bool> DeleteAsync(ArtistAlbum artistAlbum);
    }
}
