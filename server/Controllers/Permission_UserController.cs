using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Permission_UserController : ControllerBase
    {
        private readonly IPermission_UserService _permission_user_service;
        public Permission_UserController(IPermission_UserService permission_user_service)
        {
            _permission_user_service = permission_user_service;
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddPermission_User(Permission_UserViewModel permission_User)
        {
            try
            {
                var newPermission = await _permission_user_service.AddPermission_User(permission_User);
                return Ok(new
                {
                    status = true,
                    newPermission
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdatePermission_User(Permission_UserViewModel permission_User, int id)
        {
            permission_User.userId = id;
            try
            {
                var status = await _permission_user_service.UpdatePermission_User(permission_User);
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
        public async Task<IActionResult> DeletePermission_User(int id)
        {
            try
            {
                var status = await _permission_user_service.DeletePermission_User(id);
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
        public async Task<IActionResult> GetAllPermission_User()
        {
            try
            {
                List<Permission_User> permission_Users = await _permission_user_service.GetAllPermission_User();
                return Ok(new
                {
                    permission_Users,
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
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                Permission_User permission_User = await _permission_user_service.GetPermission_UserById(id);
                return Ok(new
                {
                    permission_User,
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
