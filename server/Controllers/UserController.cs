using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using MediaWebApi.Attributes;
using Microsoft.AspNetCore.Mvc;
using MediaWebApi.Extensions;
using MediaWebApi.Services.Interface;

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
                    user = newUser,
                });
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new
                { 
                    message = ex.Message,
                });

            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel loginUser)
        {
            try
            {
                var jwt = await _userService.LoginUser(loginUser);
                return Ok(new
                {
                    jwt,
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });

            }
        }

        [HttpPost("loginWithJwt")]
        [VerifyToken]
        public async Task<IActionResult> LoginWithJwt()
        {
            try
            {
                //var jwt = await _userService.LoginUser(loginUser);
                int userId = HttpContext.GetUserId();
                User? user = await _userService.GetUserById(userId);
                return Ok(new
                {
                    user
                }); ;
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });

            }
        }

    }
}
