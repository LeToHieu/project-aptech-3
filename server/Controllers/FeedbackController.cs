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
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateFeedback(FeedbackViewModel feedback)
        {
            try
            {
                var newFeedback = await _feedbackService.AddFeedback(feedback);
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

        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            try
            {
                List<Feedback> feedback = await _feedbackService.GetAllFeedback();
                var settings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };
                var json = JsonConvert.SerializeObject(feedback, settings);
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
        [HttpGet("stats")]
        public async Task<IActionResult> GetStatFeedback()
        {
            try
            {
                int[] feedback = await _feedbackService.GetStatFeedback();
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
        public async Task<IActionResult> GetFeedbackById(int id)
        {
            try
            {
                Feedback feedback = await _feedbackService.GetFeedbackById(id);
                var settings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };
                var json = JsonConvert.SerializeObject(feedback, settings);
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
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            try
            {
                var status = await _feedbackService.DeleteFeedback(id);
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
    }
}
