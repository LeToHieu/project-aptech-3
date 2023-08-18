using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly MediaContext _context;
        public FeedbackRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Feedback?>?> GetAllFeedback()
        {
            return await _context.Feedbacks
                .Include(o => o.User)
                .Include(o => o.Media_Feedback)
                .ThenInclude(od => od.Media)
                .ToListAsync();
        }
        public async Task<int[]> GetStatFeedback()
        {
            var feedbacks = await _context.Feedbacks.Include(o => o.User).ToListAsync();

            int positiveCount = 0;
            int negativeCount = 0;

            foreach (var feedback in feedbacks)
            {
                int sentimentScore = AnalyzeFeedbackSentiment(feedback.content);

                if (sentimentScore >= 0)
                {
                    positiveCount++;
                }
                else if (sentimentScore < 0)
                {
                    negativeCount++;
                }
            }

            return new int[] { positiveCount, negativeCount };
        }

        private int AnalyzeFeedbackSentiment(string content)
        {
            string lowerContent = content.ToLower();
            string[] negativeKeywords = { "không tốt", "tệ", "xấu", "bất mãn", "chán", "khó chịu" };
            string[] positiveKeywords = { "tốt", "tuyệt vời", "hài lòng", "ưng ý", "hạnh phúc", "thú vị" };

            int sentimentScore = 0;

            foreach (string keyword in negativeKeywords)
            {
                if (lowerContent.Contains(keyword))
                {
                    sentimentScore--;
                }
            }

            foreach (string keyword in positiveKeywords)
            {
                if (lowerContent.Contains(keyword))
                {
                    sentimentScore++;
                }
            }

            return sentimentScore;
        }
        public async Task<Feedback?> GetFeedbackById(int id)
        {
            Feedback? feedback = await _context.Feedbacks.Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == id); ;
            if (feedback == null)
            {
                throw new ArgumentException("Feedback not found");

            }
            return feedback;
        }
        public async Task<Feedback?> AddFeedback(FeedbackViewModel feedback)
        {
            string sql = "EXECUTE InsertFeedback @user_id, @content";
            IEnumerable<Feedback> result = await _context.Feedbacks.FromSqlRaw(sql,
                    new SqlParameter("@user_id", feedback.userId),
                    new SqlParameter("@content", feedback.content)

            ).ToListAsync();
            Feedback? newFeedback = result.FirstOrDefault();
            return newFeedback;
        }
        public async Task<bool?> DeleteFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);

            if (feedback == null)
            {
                return false;
            }
            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
