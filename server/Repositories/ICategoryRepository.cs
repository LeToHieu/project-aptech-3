using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category?>?> GetCategories();
        Task<Category?> GetCategory(int id);
        Task<Category?> CreateCategory(CategoryViewModel category);
        Task<bool?> UpdateCategory(Category category);
        Task<bool?> DeleteCategory(int id);
    }
}
