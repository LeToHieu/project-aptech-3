using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController:ControllerBase
    {
        private readonly IArtistService _artistService;
        public ArtistController (IArtistService artistService)
        {
            _artistService = artistService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateArtist(ArtistViewModel artist)
        {
            try
            {
                var newArtist = await _artistService.CreateArtist(artist);
                return Ok(new
                {
                    status = true,
                    newArtist
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdateArtist(ArtistViewModel artist, int id)
        {
            Artist update = new Artist
            {
                Id = id,
                ArtistName = artist.ArtistName,
                Description = artist.Description,
            };
            try
            {
                var status = await _artistService.UpdateArtist(update);
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
        public async Task<IActionResult> DeleteArtist(int id)
        {
            try
            {
                var status = await _artistService.DeleteArtist(id);
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
        public async Task<IActionResult> GetAllArtists()
        {
            try
            {
                List<Artist> artists = await _artistService.GetArtists();
                return Ok(new
                {
                    artists,
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
        public async Task<IActionResult> GetArtistById(int id)
        {
            try
            {
                Artist artist = await _artistService.GetArtistById(id);
                return Ok(new
                {
                    artist,
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
