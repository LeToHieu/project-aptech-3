using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly MediaContext _context;
        public PromotionRepository (MediaContext context)
        {
            _context = context;
        }

        public async Task<Promotion?> CreatePromotion(PromotionViewModal promotion)
        {
            string sql = "EXECUTE Insert Promotion @promotion_name, @discount, @description, @start_date, @end_date";
            IEnumerable<Promotion> result = await _context.Promotions.FromSqlRaw(sql,
                                    new SqlParameter("@promotion_name", promotion.PromotionName),
                                    new SqlParameter("@discount", promotion.Discount),
                                    new SqlParameter("@description", promotion.Description),
                                    new SqlParameter("@start_date", promotion.StartDate),
                                    new SqlParameter("@end_date", promotion.EndDate)
                                ).ToListAsync();

            Promotion? newPromotion = result.FirstOrDefault();

            return newPromotion;
        }

        public async Task<bool?> DeletePromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null)
            {
                throw new ArgumentException("Promotion not found");
            }
            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();


            return true;
        }

        public async Task<List<Promotion?>?> GetAllPromotions()
        {
            return await _context.Promotions.ToListAsync();
        }

        public async Task<Promotion?> GetPromotionById(int id)
        {
            Promotion? promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null)
            {
                throw new ArgumentException("Promotion not found");

            }
            return promotion;
        }

        public async Task<Promotion?> UpdatePromotion(Promotion promotion)
        {
            string sql = "EXECUTE UpdatePromotion @id, @promotion_name, @discount, @description, @start_date, @end_date";
            IEnumerable<Promotion> result = await _context.Promotions.FromSqlRaw(sql,
                                    new SqlParameter("@id", promotion.Id),
                                    new SqlParameter("@promotion_name", promotion.PromotionName),
                                    new SqlParameter("@discount", promotion.Discount),
                                    new SqlParameter("@description", promotion.Description),
                                    new SqlParameter("@start_date", promotion.StartDate),
                                    new SqlParameter("@end_date", promotion.EndDate)
                                ).ToListAsync();

            Promotion? newPromotion = result.FirstOrDefault();

            return newPromotion;
        }
    }
}
