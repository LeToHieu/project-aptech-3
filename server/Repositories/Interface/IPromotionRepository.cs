using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IPromotionRepository
    {
        Task<List<Promotion?>?> GetAllPromotions();
        Task<Promotion?> GetPromotionById(int id);
        Task<Promotion?> CreatePromotion(PromotionViewModal promotion);
        Task<Promotion?> UpdatePromotion(Promotion promotion);
        Task<bool?> DeletePromotion(int id);
    }
}
