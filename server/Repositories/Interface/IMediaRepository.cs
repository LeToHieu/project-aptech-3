using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IMediaRepository
    {
        Task<List<ArtistMedia?>?> GetAllMedia();
        Task<ArtistMedia?> GetMediaById(int id);
        Task<Media?> AddMedia(MediaViewModel media);
        Task<bool?> UpdateMedia(MediaViewModel media);
        Task<bool?> DeleteMedia(int id);

        Task<string?> UpLoadFile(IFormFile file);

        Task<decimal> GetDuration(string path);
    }
}
