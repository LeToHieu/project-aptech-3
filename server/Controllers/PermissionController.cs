using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using MediaWebApi.Services.Interface;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        public PermissionController(IPermissionService permission)
        {
            _permissionService = permission;
        }
        [HttpPost("add")]
        public async Task<IActionResult> CreatePermission(PermissionViewModel permission)
        {
            try
            {
                var newpermission = await _permissionService.AddPermission(permission);
                return Ok(new
                {
                    status = true,
                    newpermission
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdatePermission(PermissionViewModel permission, int id)
        {
            permission.Id = id;
            try
            {
                var status = await _permissionService.UpdatePermission(permission);
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
        public async Task<IActionResult> DeletePermission(int id)
        {
            try
            {
                var status = await _permissionService.DeletePermission(id);
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
        public async Task<IActionResult> GetAllPermission()
        {
            try
            {
                List<Permissions> permission = await _permissionService.GetAllPermission();
                return Ok(new
                {
                    permission,
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
