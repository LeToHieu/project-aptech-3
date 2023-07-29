using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IPromotionRepository _promotionRepository;
        public PromotionService (IPromotionRepository promotionRepository)
        {
            _promotionRepository = promotionRepository;
        }
        public async Task<Promotion?> CreatePromotion(PromotionViewModal promotion)
        {
            return await _promotionRepository.CreatePromotion(promotion);
        }

        public async Task<bool?> DeletePromotion(int id)
        {
            var existingPro = await _promotionRepository.GetPromotionById(id);
            if (existingPro != null)
            {
                return await _promotionRepository.DeletePromotion(id);
            }
            throw new Exception("Id not found");
        }

        public async Task<List<Promotion?>?> GetAllPromotions()
        {
            return await _promotionRepository.GetAllPromotions();
        }

        public async Task<Promotion?> GetPromotionById(int id)
        {
            var existingPro = await _promotionRepository.GetPromotionById(id);
            if (existingPro != null)
            {
                return await _promotionRepository.GetPromotionById(id);
            }
            throw new Exception("Id not found");
        }

        public Task<Promotion?> UpdatePromotion(Promotion promotion)
        {
            return _promotionRepository.UpdatePromotion(promotion);
        }
    }
}
