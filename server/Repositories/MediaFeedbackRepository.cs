using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class MediaFeedbackRepository : IMediaFeedbackRepository
    {
        private readonly MediaContext _context;

        public MediaFeedbackRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Media_Feedback?>?> GetAllMedia_Feedback()
        {
            List<Media_Feedback?>? feedback = await _context.Media_Feedback
                .Select(o => new Media_Feedback()
                {
                    Id = o.Id,
                    mediaId = o.mediaId,
                    feedbackId = o.feedbackId,
                    Feedback = o.Feedback,
                    Media = o.Media,
                })
                .ToListAsync();
            return feedback;
        }
        public async Task<List<Media_Feedback?>?> GetMedia_FeedbackByMediaId(int id)
        {
            List<Media_Feedback?>? feedback = await _context.Media_Feedback
        .Where(o => o.mediaId == id)
        .Select(o => new Media_Feedback()
        {
            Id = o.Id,
            mediaId = o.mediaId,
            feedbackId = o.feedbackId,
            Feedback = o.Feedback,
            Media = o.Media,
        })
        .ToListAsync();
            return feedback;
        }
        public async Task<Media_Feedback?> AddMedia_Feedback(MediaFeedbackViewModel mediaFeedback)
        {
            string sql = "EXECUTE InsertMediaFeedback @mediaId, @feedbackId";
            IEnumerable<Media_Feedback> result = await _context.Media_Feedback.FromSqlRaw(sql,
                new SqlParameter("@mediaId", mediaFeedback.mediaId),
                new SqlParameter("@feedbackId", mediaFeedback.feedbackId)

            ).ToListAsync();
            Media_Feedback? newFeedback = result.FirstOrDefault();

            return newFeedback;
        }
        public async Task<bool?> DeleteMedia_Feedback(int id)
        {
            var feedback = await _context.Media_Feedback.FindAsync(id);

            if (feedback == null)
            {
                return false;
            }
            _context.Media_Feedback.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
