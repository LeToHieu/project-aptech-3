using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumFeedbackController : ControllerBase
    {
        private readonly IAlbumFeedbackService _albumFeedbackService;
        public AlbumFeedbackController(IAlbumFeedbackService albumFeedbackService)
        {
            _albumFeedbackService = albumFeedbackService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAlbum_Feedback()
        {
            try
            {
                List<Album_Feedback> feedback = await _albumFeedbackService.GetAllAlbum_Feedback();
                return Ok(new
                {
                    feedback,
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
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            try
            {
                var status = await _albumFeedbackService.DeleteAlbum_Feedback(id);
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
        [HttpPost("add")]
        public async Task<IActionResult> CreateMediaFeedback(AlbumFeedbackViewModel feedback)
        {
            try
            {
                var newFeedback = await _albumFeedbackService.AddAlbum_Feedback(feedback);
                return Ok(new
                {
                    status = true,
                    newFeedback
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
