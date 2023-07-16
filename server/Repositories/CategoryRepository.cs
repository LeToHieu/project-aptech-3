using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MediaContext _context;

        public CategoryRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<Category?> CreateCategory(CategoryViewModel category)
        {
            string sql = "EXECUTE InsertCategory @category_name, @description";
            IEnumerable<Category> result = await _context.Categories.FromSqlRaw(sql,
                                    new SqlParameter("@category_name", category.CategoryName),
                                    new SqlParameter("@description", category.Description)
                                ).ToListAsync();

            Category? newCategory = result.FirstOrDefault();
            if (newCategory == null)
            {
                throw new ArgumentException("Can not create category");
            }
            return newCategory;

        }

        public async Task<bool?> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return null;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Category?>?> GetCategories()
        {
            List<Category> categories = await _context.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category?> GetCategory(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<bool?> UpdateCategory(Category category)
        {
            string sql = "EXECUTE UpdateCategory @Id, @category_name, @description";
            IEnumerable<Category> result = await _context.Categories.FromSqlRaw(sql,
                                    new SqlParameter("@Id", category.Id),
                                    new SqlParameter("@category_name", category.CategoryName),
                                    new SqlParameter("@description", category.Description)
                                ).ToListAsync();

            Category? updated = result.FirstOrDefault();
            if (updated == null)
            {
                return false;
            }
            
            return true;
        }
    }
}
