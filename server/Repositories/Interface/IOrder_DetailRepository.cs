using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Repositories.Interface
{
    public interface IOrder_DetailRepository
    {
        Task<List<Order_Detail?>?> GetAllOrder_Detail();
        Task<Order_Detail?> GetOrder_DetailById(int id);
        Task<Order_Detail?> AddOrder_Detail(Order_DetailViewModel order_detail);
        Task<bool?> UpdateOrder_Detail(Order_DetailViewModel order_detail);
        Task<bool?> DeleteOrder_Detail(int id);
    }
}
