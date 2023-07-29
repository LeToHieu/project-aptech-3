using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface ICategoryService
    {
        Task<List<Category?>?> GetCategories();
        Task<Category?> GetCategory(int id);
        Task<Category?> CreateCategory(CategoryViewModel category);
        Task<bool?> UpdateCategory(Category category);
        Task<bool?> DeleteCategory(int id);
    }
}
