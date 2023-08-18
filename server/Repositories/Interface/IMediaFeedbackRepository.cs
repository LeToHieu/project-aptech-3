﻿using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IMediaFeedbackRepository
    {
        Task<List<Media_Feedback?>?> GetAllMedia_Feedback();
        Task<Media_Feedback?> AddMedia_Feedback(MediaFeedbackViewModel mediaFeedback);
        Task<bool?> DeleteMedia_Feedback(int id);
    }
}