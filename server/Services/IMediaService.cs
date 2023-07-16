using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public interface IMediaService
    {
        Task<List<Media?>?> GetAllMedia();
        Task<Media?> GetMediaById(int id);
        Task<Media?> AddMedia(MediaViewModel media);
        Task<bool?> UpdateMedia(MediaViewModel media);
        Task<bool?> DeleteMedia(int id);
    }
}
