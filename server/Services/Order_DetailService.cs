using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using static MediaWebApi.Models.Order_Detail;
namespace MediaWebApi.Services
{
    public class Order_DetailService: IOrder_DetailService
    {
        public readonly IOrder_DetailRepository _order_detailRepository;

        public Order_DetailService(IOrder_DetailRepository order_detailRepository)
        {
            _order_detailRepository = order_detailRepository;
        }
        public async Task<List<Order_Detail?>?> GetAllOrder_Detail()
        {
            return await _order_detailRepository.GetAllOrder_Detail();
        }
        public async Task<Order_Detail?> GetOrder_DetailById(int id)
        {
            return await _order_detailRepository.GetOrder_DetailById(id); 
        }
        public async Task<List<Order_Detail?>?> GetOrder_DetailByOrderId(int id)
        {
            return await _order_detailRepository.GetOrder_DetailByOrderId(id);
        }
        public async Task<Order_Detail?> AddOrder_Detail(Order_DetailViewModel order_detail)
        {
            return await _order_detailRepository.AddOrder_Detail(order_detail);
        }
        public async Task<bool?> UpdateOrder_Detail(Order_DetailViewModel order_detail)
        {
            return true;
            //var checkExisting = _order_detailRepository.GetOrder_DetailById(order_detail.Id);
            //if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            //return await _order_detailRepository.UpdateOrder_Detail(order_detail);
        }
        public async Task<bool?> DeleteOrder_Detail(int id)
        {
            var checkExisting = _order_detailRepository.GetOrder_DetailById(id);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _order_detailRepository.DeleteOrder_Detail(id);
        }
    }
}
