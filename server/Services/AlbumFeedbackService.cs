using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class AlbumFeedbackService : IAlbumFeedbackService
    {
        public readonly IAlbumFeedbackRepository _albumFeedbackRepository;

        public AlbumFeedbackService(IAlbumFeedbackRepository albumFeedbackRepository)
        {
            _albumFeedbackRepository = albumFeedbackRepository;
        }
        public async Task<List<Album_Feedback?>?> GetAllAlbum_Feedback()
        {
            return await _albumFeedbackRepository.GetAllAlbum_Feedback();
        }
        public async Task<Album_Feedback?> AddAlbum_Feedback(AlbumFeedbackViewModel albumFeedback)
        {
            return await _albumFeedbackRepository.AddAlbum_Feedback(albumFeedback);
        }
        public async Task<bool?> DeleteAlbum_Feedback(int id)
        {
            return await _albumFeedbackRepository.DeleteAlbum_Feedback(id);
        }
    }
}
