using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using System.Diagnostics;
using System.Text;
using TagLib;
namespace MediaWebApi.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly MediaContext _context;
        public MediaRepository(MediaContext context)
        {
            _context = context;
        }

        public async Task<Media?> AddMedia(MediaViewModel media)
        {
            string sql = "EXECUTE InsertMedia @media_name, @media_image, @media_url, @duration, @price, @category_id, @artist_id";
            IEnumerable<Media> result = await _context.Medias.FromSqlRaw(sql,
                                    new SqlParameter("@media_name", media.MediaName),
                                    new SqlParameter("@media_image", media.MediaImage),
                                    new SqlParameter("@media_url", media.MediaUrl),
                                    new SqlParameter("@duration", media.Duration),
                                    new SqlParameter("@price", media.Price),
                                    new SqlParameter("@category_id", media.CategoryId),
                                    new SqlParameter("@artist_id", media.ArtistId)
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

        public async Task<List<ArtistMedia?>?> GetAllMedia()
        {
            //string sql = "EXECUTE GetArtistMedia";
            //IEnumerable<ArtistMedia> result = await _context.ArtistMedias.FromSqlRaw(sql).ToListAsync();
            //return await _context.Medias.Include(m => m.Category).ToListAsync();
            //return result.ToList<ArtistMedia?>();
            //var artists = _context.Artists.ToList();
            //var medias = _context.Medias.ToList();

            //// Join the ArtistMedia table on the artist_id column.
            //var mediasWithArtists = medias.Join(
            //    _context.ArtistMedias,
            //    media => media.Id,
            //    artistMedia => artistMedia.MediaId,
            //    (media, artistMedia) => new { Media = media, ArtistMedia = artistMedia });


            //// Return the medias with artists.
            ////return mediasWithArtists.Select(media => new
            ////{
            ////    Media = media,
            ////    Artist = media.Artist
            ////});
            //return mediasWithArtists;
            var artistMedias = await _context.ArtistMedias.ToListAsync();

            // Get all the artists.
            var artists = await _context.Artists.ToListAsync();

            // Get all the medias.
            var medias = await _context.Medias.ToListAsync();

            // Create a dictionary to map artist IDs to artists.
            var artistIdToArtist = artists.ToDictionary(artist => artist.Id, artist => artist);

            // Create a dictionary to map media IDs to medias.
            var mediaIdToMedia = medias.ToDictionary(media => media.Id, media => media);

            // Iterate through the artist medias and populate the artist and media properties.
            foreach (var artistMedia in artistMedias)
            {
                artistMedia.Artist = artistIdToArtist[artistMedia.ArtistId];
                artistMedia.Media = mediaIdToMedia[artistMedia.MediaId];
            }

            // Return the artist medias with data.
            return artistMedias;

        }

        public async Task<ArtistMedia?> GetMediaById(int id)
        {
            // Get the artist media from the database.
            var artistMedia = await _context.ArtistMedias.SingleOrDefaultAsync(artistMedia => artistMedia.MediaId == id);

            // If the artist media is not found, return null.
            if (artistMedia == null)
            {
                return null;
            }

            // Get the artist data.
            var artist = await _context.Artists.SingleOrDefaultAsync(artist => artist.Id == artistMedia.ArtistId);

            // Get the media data.
            var media = await _context.Medias.SingleOrDefaultAsync(media => media.Id == artistMedia.MediaId);

            // Populate the artist and media properties on the artist media.
            artistMedia.Artist = artist;
            artistMedia.Media = media;

            // Return the artist media.
            return artistMedia;
            //var existingMedia = await _context.Medias.FindAsync(id);
            //if (existingMedia == null)
            //{
            //    throw new ArgumentException("Id not found");
            //}
            //return existingMedia;
        }

        public async Task<bool?> UpdateMedia(MediaViewModel media)
        {
            string sql = "EXECUTE UpdateMedia @media_id, @media_name, @media_image, @media_url, @duration, @price, @category_id";
            IEnumerable<Media> result = await _context.Medias.FromSqlRaw(sql,
                                    new SqlParameter("@media_id", media.Id),
                                    new SqlParameter("@media_name", media.MediaName),
                                    new SqlParameter("@media_image", media.MediaImage),
                                    new SqlParameter("@media_url", media.MediaUrl),
                                    new SqlParameter("@duration", media.Duration),
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

        public async Task<decimal> GetDuration(string path)
        {
            var file = TagLib.File.Create(path);
            var duration = file.Properties.Duration.TotalSeconds;
            return Convert.ToDecimal(duration);
        }
    }
}
