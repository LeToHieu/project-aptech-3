using MediaWebApi.Models;

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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreateOrder(OrderViewModel order)
        {
            try
            {
                var newOrder = await _orderService.AddOrder(order);
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
        public async Task<IActionResult> UpdateOrder(OrderViewModel order, int id)
        {
            order.Id = id;
            try
            {
                var status = await _orderService.UpdateOrder(order);
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
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                var status = await _orderService.DeleteOrder(id);
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
        public async Task<IActionResult> GetAllOrder()
        {
            try
            {
                List<Orders> order = await _orderService.GetAllOrder();
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
