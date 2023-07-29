using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IMediaService
    {
        Task<List<ArtistMedia?>?> GetAllMedia();
        Task<ArtistMedia?> GetMediaById(int id);
        Task<Media?> AddMedia(MediaViewModel media);
        Task<bool?> UpdateMedia(MediaViewModel media);
        Task<bool?> DeleteMedia(int id);
    }
}
