using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<List<Orders?>?> GetAllOrder();
        Task<Orders?> GetOrderById(int id);
        Task<List<Orders?>>? GetOrderByUserId(int id);
        Task<Orders?> AddOrder(OrderViewModelWithoutId order);
        Task<bool?> UpdateOrder(OrderViewModel order);
        Task<bool?> DeleteOrder(int id);
    }
}
