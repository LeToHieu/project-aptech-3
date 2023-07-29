using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterViewModel user);
        Task<User?> GetUserById(int userId);
        Task<string> LoginUser(LoginViewModel loginUser);
    }
}
