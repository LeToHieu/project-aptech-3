using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class MediaFeedbackService : IMediaFeedbackService
    {
        public readonly IMediaFeedbackRepository _mediaFeedbackRepository;

        public MediaFeedbackService(IMediaFeedbackRepository mediaFeedbackRepository)
        {
            _mediaFeedbackRepository = mediaFeedbackRepository;
        }
        public async Task<List<Media_Feedback?>?> GetAllMedia_Feedback()
        {
            return await _mediaFeedbackRepository.GetAllMedia_Feedback();
        }
        public async Task<Media_Feedback?> AddMedia_Feedback(MediaFeedbackViewModel mediaFeedback)
        {
            return await _mediaFeedbackRepository.AddMedia_Feedback(mediaFeedback);
        }
        public async Task<bool?> DeleteMedia_Feedback(int id)
        {
            return await _mediaFeedbackRepository.DeleteMedia_Feedback(id); 
        }
        public async Task<List<Media_Feedback?>?> GetMedia_FeedbackByMediaId(int id)
        {
            return await _mediaFeedbackRepository.GetMedia_FeedbackByMediaId(id);
        }
    }
}
