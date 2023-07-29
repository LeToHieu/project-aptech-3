using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IArtistService
    {
        Task<List<Artist?>?> GetArtists();
        Task<Artist?> GetArtistById(int id);
        Task<Artist?> CreateArtist(ArtistViewModel artist);
        Task<bool?> UpdateArtist(Artist artist);
        Task<bool?> DeleteArtist(int id);
    }
}
