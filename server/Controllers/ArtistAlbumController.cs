using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistAlbumController:ControllerBase
    {
        //private readonly IArtistAlbumService _artistAlbumService;
        private readonly IArtistAlbumRepository _repository;
        public ArtistAlbumController (IArtistAlbumRepository repository)
        {
            _repository = repository;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateArtistAlbum(ArtistAlbum artistAlbum)
        {
            try
            {
                var newAA = await _repository.CreateAsync(artistAlbum);
                return Ok(new
                {
                    status = true,
                    newAA
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteAA(ArtistAlbum artistAlbum)
        {
            try
            {
                var status = await _repository.DeleteAsync(artistAlbum);
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
        public async Task<IActionResult> GetAllAA()
        {
            try
            {
                List<ArtistAlbum> aa = await _repository.GetAllWithArtistsAndAlbumsAsync();
                var settings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };
                var json = JsonConvert.SerializeObject(aa, settings);

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
    }
}
