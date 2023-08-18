using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaFeedbackController : ControllerBase
    {
        private readonly IMediaFeedbackService _mediaFeedbackService;
        public MediaFeedbackController(IMediaFeedbackService mediaFeedbackService)
        {
            _mediaFeedbackService = mediaFeedbackService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMedia_Feedback()
        {
            try
            {
                List<Media_Feedback> feedback = await _mediaFeedbackService.GetAllMedia_Feedback();
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedia_FeedbackByMediaId (int id)
        {
            try
            {
                List<Media_Feedback> feedback = await _mediaFeedbackService.GetMedia_FeedbackByMediaId(id);
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
                var status = await _mediaFeedbackService.DeleteMedia_Feedback(id);
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
        public async Task<IActionResult> CreateMediaFeedback(MediaFeedbackViewModel feedback)
        {
            try
            {
                var newFeedback = await _mediaFeedbackService.AddMedia_Feedback(feedback);
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
