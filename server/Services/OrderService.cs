using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using static MediaWebApi.Models.Orders;

namespace MediaWebApi.Services
{
    public class OrderService : IOrderService
    {
        public readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<List<Orders?>?> GetAllOrder()
        {
            return await _orderRepository.GetAllOrder();
        }
        public async Task<Orders?> GetOrderById(int id)
        {
            return await _orderRepository.GetOrderById(id); 
        }
        public async Task<Orders?> AddOrder(OrderViewModel order)
        {
            return await _orderRepository.AddOrder(order);  
        }
        public async Task<bool?> UpdateOrder(OrderViewModel order)
        {
            var checkExisting = await _orderRepository.GetOrderById(order.Id);
            if ( checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _orderRepository.UpdateOrder(order);
        }
        public async Task<bool?> DeleteOrder(int id)
        {
            var checkExisting = await _orderRepository.GetOrderById(id);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _orderRepository.DeleteOrder(id);
        }
    }
}
