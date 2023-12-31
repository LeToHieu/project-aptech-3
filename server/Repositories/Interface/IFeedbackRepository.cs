﻿using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Repositories.Interface
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback?>?> GetAllFeedback();
        Task<int[]> GetStatFeedback();
        Task<Feedback?> GetFeedbackById(int id);
        Task<Feedback?> AddFeedback(FeedbackViewModel feedback);
        Task<bool?> DeleteFeedback(int id);
    }
}
