using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class AlbumFeedbackRepository : IAlbumFeedbackRepository
    {
        private readonly MediaContext _context;

        public AlbumFeedbackRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Album_Feedback?>?> GetAllAlbum_Feedback()
        {
            List<Album_Feedback?>? feedback = await _context.Album_Feedback
            .Select(o => new Album_Feedback()
            {
                Id = o.Id,
                albumId = o.albumId,
                feedbackId = o.feedbackId,
                Feedback = o.Feedback,
                Album = o.Album
            })
            .ToListAsync();
            return feedback;
        }
        public async Task<Album_Feedback?> AddAlbum_Feedback(AlbumFeedbackViewModel albumFeedback)
        {
            string sql = "EXECUTE InsertAlbumFeedback @album_id, @feedback_id";
            IEnumerable<Album_Feedback> result = await _context.Album_Feedback.FromSqlRaw(sql,
                new SqlParameter("@album_id", albumFeedback.albumId),
                new SqlParameter("@feedback_id", albumFeedback.feedbackId)

            ).ToListAsync();
            Album_Feedback? newFeedback = result.FirstOrDefault();

            return newFeedback;
        }
        public async Task<bool?> DeleteAlbum_Feedback(int id)
        {
            var feedback = await _context.Album_Feedback.FindAsync(id);

            if (feedback == null)
            {
                return false;
            }
            _context.Album_Feedback.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
