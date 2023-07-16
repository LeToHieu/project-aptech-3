using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Services
{
    public class MediaService : IMediaService
    {
        private readonly IMediaRepository _mediaRepository;
        public MediaService(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }
        public async Task<Media?> AddMedia(MediaViewModel media)
        {
            var urlImage = await _mediaRepository.UpLoadFile(media.fileImage);
            var urlVideo = await _mediaRepository.UpLoadFile(media.fileVideo);

            media.MediaImage = urlImage;
            media.MediaUrl = urlVideo;
            return await _mediaRepository.AddMedia(media);
        }


        public async Task<bool?> DeleteMedia(int id)
        {
            var existingMedia = await _mediaRepository.GetMediaById(id);
            if (existingMedia == null)
            {
                throw new ArgumentException("Id not found");
            }
            return await _mediaRepository.DeleteMedia(id);
        }

        public async Task<List<Media?>?> GetAllMedia()
        {
            return await _mediaRepository.GetAllMedia();
        }

        public async Task<Media?> GetMediaById(int id)
        {
            return await _mediaRepository.GetMediaById(id);
        }

        public async Task<bool?> UpdateMedia(MediaViewModel media)
        {
            var existingMedia = _mediaRepository.GetMediaById(media.Id);
            if (existingMedia == null)
            {
                throw new ArgumentException("Id not found");
            }
            if (media.fileVideo != null)
            {
                string url = await _mediaRepository.UpLoadFile(media.fileVideo);
                media.MediaUrl = url;
            }
            if (media.fileImage != null)
            {
                string url = await _mediaRepository.UpLoadFile(media.fileImage);
                media.MediaImage = url;
            }

            return await _mediaRepository.UpdateMedia(media);
        }
    }
}
