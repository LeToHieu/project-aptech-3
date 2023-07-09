using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterViewModel user);

    }
}
