using MediaWebApi.Models;
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
                var settings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };
                var json = JsonConvert.SerializeObject(order, settings);
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
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                Orders order = await _orderService.GetOrderById(id);
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
