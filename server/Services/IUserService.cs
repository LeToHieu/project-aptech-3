using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterViewModel user);
        Task<User?> GetUserById(int userId);
        Task<string> LoginUser(LoginViewModel loginUser);
    }
}
