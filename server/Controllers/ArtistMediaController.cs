using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistMediaController:ControllerBase
    {
        private readonly IArtistMediaRepository _repository;
        public ArtistMediaController(IArtistMediaRepository repository)
        {
            _repository = repository;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateArtistAlbum(ArtistMediaViewModel artistMedia)
        {
            try
            {
                var newAM = await _repository.CreateAsync(artistMedia);
                return Ok(new
                {
                    status = true,
                    newAM
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteAA(ArtistMediaViewModel artistMedia)
        {
            try
            {
                var status = await _repository.DeleteAsync(artistMedia);
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
                List<ArtistMedia> aa = await _repository.GetAllWithArtistsAndMediasAsync();
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
