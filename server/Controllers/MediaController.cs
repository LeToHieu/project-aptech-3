using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaController:ControllerBase
    {
        private readonly IMediaService _mediaService;
        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateMedia([FromForm] MediaViewModel media)
        {
            try
            {
                var newMedia = await _mediaService.AddMedia(media);
                return Ok(new
                {
                    status = true,
                    newMedia
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdateMedia(MediaViewModel media, int id)
        {
            media.Id = id;
            try
            {
                var status = await _mediaService.UpdateMedia(media);
                return Ok(status);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            try
            {
                var status = await _mediaService.DeleteMedia(id);
                return Ok(status);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMedias()
        {
            try
            {
                List<ArtistMedia> medias = await _mediaService.GetAllMedia();
                return Ok(new
                {
                    medias,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMediaById(int id)
        {
            try
            {
                ArtistMedia media = await _mediaService.GetMediaById(id);
                return Ok(new
                {
                    media,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
    }
}
