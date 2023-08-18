using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

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
            var duration = await _mediaRepository.GetDuration("uploads/" + urlVideo);

            media.MediaImage = urlImage;
            media.MediaUrl = urlVideo;
            media.Duration = duration;
            return await _mediaRepository.AddMedia(media);
        }


        public async Task<bool?> DeleteMedia(int id)
        {
            var existingMedia = await _mediaRepository.GetMediaById(id);
            if (existingMedia == null)
            {
                throw new ArgumentException("Id not found");
            }
            File.Delete("Uploads/" + existingMedia.Media.MediaImage);
            File.Delete("Uploads/" + existingMedia.Media.MediaUrl);
            return await _mediaRepository.DeleteMedia(id);
        }

        public async Task<List<ArtistMedia?>?> GetAllMedia()
        {
            return await _mediaRepository.GetAllMedia();
        }

        public async Task<ArtistMedia?> GetMediaById(int id)
        {
            return await _mediaRepository.GetMediaById(id);
        }

        public async Task<bool?> UpdateMedia(MediaViewModel media)
        {
            var existingMedia = await _mediaRepository.GetMediaById(media.Id);
            if (existingMedia == null)
            {
                throw new ArgumentException("Id not found");
            }
            if (media.fileVideo != null && media.MediaUrl != ".")
            {
                File.Delete("Uploads/" + existingMedia.Media.MediaUrl);
                string url = await _mediaRepository.UpLoadFile(media.fileVideo);
                media.MediaUrl = url;
                var duration = await _mediaRepository.GetDuration("uploads/" + url);
                media.Duration = duration;
            }
            else
            {
                var duration = await _mediaRepository.GetDuration("uploads/" + existingMedia.Media.MediaUrl);
                media.MediaUrl = existingMedia.Media.MediaUrl;
                media.Duration = duration;
            }
            if (media.fileImage != null && media.MediaImage != ".")
            {
                File.Delete("Uploads/" + existingMedia.Media.MediaImage);
                string url = await _mediaRepository.UpLoadFile(media.fileImage);
                media.MediaImage = url;
            }
            else
            {
                media.MediaImage = existingMedia.Media.MediaImage;
            }

            return await _mediaRepository.UpdateMedia(media);
        }
    }
}
