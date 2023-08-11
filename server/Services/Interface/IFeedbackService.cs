using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IFeedbackService
    {
        Task<List<Feedback?>?> GetAllFeedback();
        Task<Feedback?> AddFeedback(FeedbackViewModel feedback);
        Task<bool?> DeleteFeedback(int id);
    }
}
