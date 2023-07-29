using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Services.Interface
{
    public interface IOrderService
    {
        Task<List<Orders?>?> GetAllOrder();
        Task<Orders?> GetOrderById(int id);
        Task<Orders?> AddOrder(OrderViewModel order);
        Task<bool?> UpdateOrder(OrderViewModel order);
        Task<bool?> DeleteOrder(int id);
    }
}
