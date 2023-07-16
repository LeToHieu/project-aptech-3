using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories
{
    public interface IMediaRepository
    {
        Task<List<Media?>?> GetAllMedia();
        Task<Media?> GetMediaById(int id);
        Task<Media?> AddMedia(MediaViewModel media);
        Task<bool?> UpdateMedia(MediaViewModel media);
        Task<bool?> DeleteMedia(int id);

        Task<string?> UpLoadFile(IFormFile file);
    }
}
