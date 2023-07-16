using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace MediaWebApi.Repositories
{
    public class MediaRepository:IMediaRepository
    {
        private readonly MediaContext _context;
        public MediaRepository(MediaContext context)
        {
            _context = context;
        }

        public async Task<Media?> AddMedia(MediaViewModel media)
        {
            string sql = "EXECUTE InsertMedia @media_name, @media_image, @media_url, @price, @category_id";
            IEnumerable<Media> result = await _context.Medias.FromSqlRaw(sql,
                                    new SqlParameter("@media_name", media.MediaName),
                                    new SqlParameter("@media_image", media.MediaImage),
                                    new SqlParameter("@media_url", media.MediaUrl),
                                    new SqlParameter("@price", media.Price),
                                    new SqlParameter("@category_id", media.CategoryId)
                                ).ToListAsync();

            Media? newMedia = result.FirstOrDefault();
            if (newMedia == null)
            {
                throw new ArgumentException("Can not create media");
            }
            return newMedia;
        }

        public async Task<bool?> DeleteMedia(int id)
        {
            var media = await _context.Medias.FindAsync(id);

            if (media == null)
            {
                return null;
            }

            _context.Medias.Remove(media);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Media?>?> GetAllMedia()
        {
            return await _context.Medias.Include(m => m.Category).ToListAsync();
        }

        public async Task<Media?> GetMediaById(int id)
        {
            var existingMedia = await _context.Medias.FindAsync(id);
            if (existingMedia == null)
            {
                throw new ArgumentException("Id not found");
            }
            return existingMedia;
        }

        public async Task<bool?> UpdateMedia(MediaViewModel media)
        {
            string sql = "EXECUTE UpdateMedia @media_id, @media_name, @media_image, @media_url, @price, @category_id";
            IEnumerable<Media> result = await _context.Medias.FromSqlRaw(sql,
                                    new SqlParameter("@media_id", media.Id),
                                    new SqlParameter("@media_name", media.MediaName),
                                    new SqlParameter("@media_image", media.MediaImage),
                                    new SqlParameter("@media_url", media.MediaUrl),
                                    new SqlParameter("@price", media.Price),
                                    new SqlParameter("@category_id", media.CategoryId)
                                ).ToListAsync();

            Media? newMedia = result.FirstOrDefault();
            if (newMedia == null)
            {
                throw new ArgumentException("Can not update media");
            }
            return true;
        }

        public async Task<string?> UpLoadFile( IFormFile file)
        {
            string type = "";
            bool flag = false;
            var allowedExtensionsVideo = new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv" };
            var fileExtensionVideo = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsVideo.Contains(fileExtensionVideo))
            {
                type = "Videos";
                flag = true;
            }
            var allowedExtensionsImage = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
            var fileExtensionImage = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsImage.Contains(fileExtensionImage))
            {
                type = "Images";
                flag= true;
            }
            if (!flag)
            {
                throw new ArgumentException("Can not upload this file");
            }

            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No file was uploaded");
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine("Uploads/" + type, fileName);
            //using (var stream = new FileStream(filePath, FileMode.Create))
            //{
            //    await file.CopyToAsync(stream);
            //}
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    var buffer = new char[4096];
                    int bytesRead;
                    while ((bytesRead = await reader.ReadAsync(buffer, 0, buffer.Length)) > 0)
                    {
                        await stream.WriteAsync(Encoding.UTF8.GetBytes(buffer), 0, bytesRead);
                    }
                }
            }
            return filePath;
        }
    }
}
