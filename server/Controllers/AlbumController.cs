using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController:ControllerBase
    {
        private readonly IAlbumService _albumService;
        public AlbumController (IAlbumService albumService)
        {
            _albumService = albumService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateAlbum(AlbumViewModel album)
        {
            try
            {
                var newAlbum = await _albumService.CreateAlbum(album);
                return Ok(new
                {
                    status = true,
                    newAlbum
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdateAlbum(AlbumViewModel album, int id)
        {
            Album update = new Album
            {
                Id = id,
                AlbumName = album.AlbumName,
                Price = album.Price,
                Description = album.Description,
            };
            try
            {
                var status = await _albumService.UpdateAlbum(update);
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
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            try
            {
                var status = await _albumService.DeleteAlbum(id);
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
        public async Task<IActionResult> GetAllAlbums()
        {
            try
            {
                /*
                List<Album> albums = await _albumService.GetAllAlbums();
                return Ok(new
                {
                    albums,
                });
                */
                List<Album> albums = await _albumService.GetAllAlbums();
                var settings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };
                var json = JsonConvert.SerializeObject(albums, settings);
                return Ok(new
                {
                    json,
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
        public async Task<IActionResult> GetAlbumById(int id)
        {
            try
            {
                Album album = await _albumService.GetAlbumById(id);
                return Ok(new
                {
                    album,
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
