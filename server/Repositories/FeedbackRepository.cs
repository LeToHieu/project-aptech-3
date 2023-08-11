using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly MediaContext  _context;
        public FeedbackRepository(MediaContext context) {
            _context = context;
        }
        public async Task<List<Feedback?>?> GetAllFeedback()
        {
            return await _context.Feedbacks.ToListAsync();
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
