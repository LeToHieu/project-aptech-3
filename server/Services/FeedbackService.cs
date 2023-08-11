using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class FeedbackService : IFeedbackService
    {
        public readonly IFeedbackRepository _feedbackRepository;

        public FeedbackService(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }
        public async Task<List<Feedback?>?> GetAllFeedback()
        {
            return await _feedbackRepository.GetAllFeedback();  
        }
        public async Task<Feedback?> AddFeedback(FeedbackViewModel feedback)
        {
            return await _feedbackRepository.AddFeedback(feedback);
        }
        public async Task<bool?> DeleteFeedback(int id)
        {
            return await _feedbackRepository.DeleteFeedback(id);
        }
    }
}
