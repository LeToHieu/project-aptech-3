using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using MediaWebApi.Services.Interface;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Order_DetailController : ControllerBase
    {
        private readonly IOrder_DetailService _order_detailService;
        public Order_DetailController(IOrder_DetailService order_detailService)
        {
            _order_detailService = order_detailService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateOrder_Detail(Order_DetailViewModel order_detail)
        {
            try
            {
                var newOrder = await _order_detailService.AddOrder_Detail(order_detail);
                return Ok(new
                {
                    status = true,
                    newOrder
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdateOrder_Detail(Order_DetailViewModel order_detail, int id)
        {
            return Ok("He");
            //order_detail.Id = id;
            //try
            //{
            //    var status = await _order_detailService.UpdateOrder_Detail(order_detail);
            //    return Ok(status);
            //}
            //catch (ArgumentException ex)
            //{
            //    return BadRequest(new
            //    {
            //        message = ex.Message,
            //        status = false,
            //    });
            //}
        }
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteOrder_Detail(int id)
        {
            try
            {
                var status = await _order_detailService.DeleteOrder_Detail(id);
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
        public async Task<IActionResult> GetAllOrder_Detail()
        {
            try
            {
                List<Order_Detail> order = await _order_detailService.GetAllOrder_Detail();
                return Ok(new
                {
                    order,
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
        public async Task<IActionResult> GetOrder_DetailById(int id)
        {
            try
            {
                Order_Detail order = await _order_detailService.GetOrder_DetailById(id);
                return Ok(new
                {
                    order,
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
