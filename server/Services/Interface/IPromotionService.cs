using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IPromotionService
    {
        Task<List<Promotion?>?> GetAllPromotions();
        Task<Promotion?> GetPromotionById(int id);
        Task<Promotion?> CreatePromotion(PromotionViewModal promotion);
        Task<Promotion?> UpdatePromotion(Promotion promotion);
        Task<bool?> DeletePromotion(int id);
    }
}
