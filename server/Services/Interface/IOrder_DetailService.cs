using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Services.Interface
{
    public interface IOrder_DetailService
    {
        Task<List<Order_Detail?>?> GetAllOrder_Detail();
        Task<Order_Detail?> GetOrder_DetailById(int id);
        Task<List<Order_Detail?>?> GetOrder_DetailByOrderId(int id);
        Task<Order_Detail?> AddOrder_Detail(Order_DetailViewModel order_detail);
        Task<bool?> UpdateOrder_Detail(Order_DetailViewModel order_detail);
        Task<bool?> DeleteOrder_Detail(int id);
    }
}
