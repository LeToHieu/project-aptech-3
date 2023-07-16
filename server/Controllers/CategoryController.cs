using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController:ControllerBase
    {
        private readonly ICategoryService _categoryService;
        
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateCategory(CategoryViewModel category)
        {
            try
            {
                var newCategory = await _categoryService.CreateCategory(category);
                return Ok(new
                {
                    status = true,
                    newCategory
                });
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdateCategory(CategoryViewModel category, int id)
        {
            Category update = new Category
            {
                Id = id,
                CategoryName = category.CategoryName,
                Description = category.Description,
            };
            try
            {
                var status = await _categoryService.UpdateCategory(update);
                return Ok(status);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var status = await _categoryService.DeleteCategory(id);
                return Ok(status);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                List<Category> categories = await _categoryService.GetCategories();
                return Ok(new {
                    categories,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                Category category = await _categoryService.GetCategory(id);
                return Ok(new
                {
                    category,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                    status = false,
                });
            }
        }
    }
}
