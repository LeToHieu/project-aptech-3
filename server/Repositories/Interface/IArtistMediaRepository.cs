using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IArtistMediaRepository
    {
        Task<List<ArtistMedia>> GetAllAsync();

        Task<List<ArtistMedia>> GetAllWithArtistsAndMediasAsync();

        Task<ArtistMedia> CreateAsync(ArtistMediaViewModel artistMedia);

        Task<bool> DeleteAsync(ArtistMediaViewModel artistMedia);
    }
}
