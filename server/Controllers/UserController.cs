using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using MediaWebApi.Attributes;
using Microsoft.AspNetCore.Mvc;
using MediaWebApi.Extensions;
using MediaWebApi.Services.Interface;
using MediaWebApi.Services;

namespace MediaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel user)
        {
            try
            {
                var newUser = await _userService.RegisterUser(user);
                return Ok(new
                {
                    user = newUser,
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

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var status = await _userService.DeleteUser(id);
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

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> UpdatUser([FromForm] UserViewModel user, int id)
        {
            UserViewModel update = new UserViewModel
            {
                Id = id,
                Username = user.Username,
                Userimage = user.Userimage,
                Password = user.Password,
                Email = user.Email,
                Phone = user.Phone,
                Role = user.Role,
                fileImage = user.fileImage,
            };
            try
            {
                var status = await _userService.UpdateUser(update);
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
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                List<User?>? users = await _userService.GetAllUsers();
                return Ok(new
                {
                    users,
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
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                User? user = await _userService.GetUserById(id);
                return Ok(new
                {
                    user,
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
