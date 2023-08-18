using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IMediaFeedbackService
    {
        Task<List<Media_Feedback?>?> GetMedia_FeedbackByMediaId(int id);
        Task<List<Media_Feedback?>?> GetAllMedia_Feedback();
        Task<Media_Feedback?> AddMedia_Feedback(MediaFeedbackViewModel mediaFeedback);
        Task<bool?> DeleteMedia_Feedback(int id);
    }
}
