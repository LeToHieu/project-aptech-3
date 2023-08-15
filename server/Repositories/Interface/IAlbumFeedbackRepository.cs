using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories
{
    public interface IAlbumFeedbackRepository
    {
        Task<List<Album_Feedback?>?> GetAllAlbum_Feedback();
        Task<Album_Feedback?> AddAlbum_Feedback(AlbumFeedbackViewModel albumFeedback);
        Task<bool?> DeleteAlbum_Feedback(int id);
    }
}
