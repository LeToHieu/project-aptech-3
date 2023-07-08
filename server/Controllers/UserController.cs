using MediaWebApi.Models;
using MediaWebApi.Services;
using MediaWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;

        public UserController (IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel user)
        {
            try
            {
                var newUser = await _userService.RegisterUser(user);
                return Ok(new
                {
                    newUser = newUser,
                });
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new
                { 
                    Message = ex.Message,
                });

            }
        }
    }
}
