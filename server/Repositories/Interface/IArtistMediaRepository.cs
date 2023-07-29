using MediaWebApi.Models;

namespace MediaWebApi.Repositories.Interface
{
    public interface IArtistMediaRepository
    {
        Task<List<ArtistMedia>> GetAllAsync();

        Task<List<ArtistMedia>> GetAllWithArtistsAndMediasAsync();

        Task<ArtistMedia> CreateAsync(ArtistMedia artistMedia);

        Task<bool> DeleteAsync(ArtistMedia artistMedia);
    }
}
