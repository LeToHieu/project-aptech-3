using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromotionController:ControllerBase
    {
        private readonly IPromotionService _promotionService;
        public PromotionController(IPromotionService promotionService)
        {
            _promotionService = promotionService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreatePromotion(PromotionViewModal promotion)
        {
            try
            {
                var newPromotion = await _promotionService.CreatePromotion(promotion);
                return Ok(new
                {
                    status = true,
                    newPromotion
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdatePromotion(PromotionViewModal promotion, int id)
        {
            Promotion update = new Promotion
            {
                Id = id,
                PromotionName = promotion.PromotionName,
                Discount = promotion.Discount,
                Description = promotion.Description,
                StartDate = promotion.StartDate,
                EndDate =  promotion.EndDate,
            };
            try
            {
                var status = await _promotionService.UpdatePromotion(update);
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
        public async Task<IActionResult> DeletePromotion(int id)
        {
            try
            {
                var status = await _promotionService.DeletePromotion(id);
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
        public async Task<IActionResult> GetAllPromotions()
        {
            try
            {
                List<Promotion> promotions = await _promotionService.GetAllPromotions();
                return Ok(new
                {
                    promotions,
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
        public async Task<IActionResult> GetPromotionById(int id)
        {
            try
            {
                Promotion promotion = await _promotionService.GetPromotionById(id);
                return Ok(new
                {
                    promotion,
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
