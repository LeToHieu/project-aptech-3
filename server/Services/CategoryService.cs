using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category?> CreateCategory(CategoryViewModel category)
        {
            if (category.CategoryName == null)
            {
                throw new ArgumentException("Category name must be required");
            }
            return await _categoryRepository.CreateCategory(category);
        }

        public async Task<bool?> DeleteCategory(int id)
        {
            var existingCategory = await _categoryRepository.GetCategory(id);
            if (existingCategory == null)
            {
                throw new ArgumentException("Id not found");
            }
            return await _categoryRepository.DeleteCategory(id);

        }

        public async Task<List<Category?>?> GetCategories()
        {
            return await _categoryRepository.GetCategories();
        }

        public async Task<Category?> GetCategory(int id)
        {
            return await _categoryRepository.GetCategory(id);
        }

        public async Task<bool?> UpdateCategory(Category category)
        {
            var existingCategory = await _categoryRepository.GetCategory(category.Id);
            if (existingCategory == null)
            {
                throw new ArgumentException("Id not found");
            }
            return await _categoryRepository.UpdateCategory(category);
        }
    }
}
