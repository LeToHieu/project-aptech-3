using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class ArtistRepository : IArtistRepository
    {
        private readonly MediaContext _context;

        public ArtistRepository(MediaContext context) 
        { 
            _context= context;
        }
        public async Task<Artist?> CreateArtist(ArtistViewModel artist)
        {
            string sql = "EXECUTE InsertArtist @artist_name, @artist_image, @description";
            IEnumerable<Artist> result = await _context.Artists.FromSqlRaw(sql,
                                    new SqlParameter("@artist_name", artist.ArtistName),
                                    new SqlParameter("@artist_image", artist.ArtistImage),
                                    new SqlParameter("@description", artist.Description)
                                ).ToListAsync();

            Artist? newArtist = result.FirstOrDefault();
            if (newArtist == null)
            {
                throw new ArgumentException("Can not create category");
            }
            return newArtist;
        }

        public async Task<bool?> DeleteArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
            {
                return null;
            }

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Artist?> GetArtistById(int id)
        {
            var existingArtist =  await _context.Artists.FindAsync(id);
            if (existingArtist == null)
            {
                throw new ArgumentException("Id not found");
            }
            return existingArtist;
        }

        public async Task<List<Artist?>?> GetArtists()
        {
            List<Artist> artists = await _context.Artists.ToListAsync();
            return artists;
        }

        public async Task<bool?> UpdateArtist(Artist artist)
        {
            string sql = "EXECUTE UpdateArtist @Id, @@artist_name, @description";
            IEnumerable<Category> result = await _context.Categories.FromSqlRaw(sql,
                                    new SqlParameter("@Id", artist.Id),
                                    new SqlParameter("@artist_name", artist.ArtistName),
                                    new SqlParameter("@description", artist.Description)
                                ).ToListAsync();

            Category? updated = result.FirstOrDefault();
            if (updated == null)
            {
                return false;
            }

            return true;
        }

        public async Task<string?> UpLoadFile(IFormFile file)
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
                flag = true;
            }
            var allowedExtensionsSong = new[] { ".mp3", ".wav" };
            var fileExtensionSong = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsSong.Contains(fileExtensionSong))
            {
                type = "Songs";
                flag = true;
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
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            //using (var stream = new FileStream(filePath, FileMode.Create))
            //{
            //    using (var reader = new StreamReader(file.OpenReadStream()))
            //    {
            //        var buffer = new char[4096];
            //        int bytesRead;
            //        while ((bytesRead = await reader.ReadAsync(buffer, 0, buffer.Length)) > 0)
            //        {
            //            await stream.WriteAsync(Encoding.UTF8.GetBytes(buffer), 0, bytesRead);
            //        }
            //    }
            //}
            return type + "/" + fileName;
        }
    }
}
