using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterViewModel user);
        //Task<User> GetUserById(int id);
        //Task<User> GetUserByEmail(string email);
        //Task<List<User>> GetAllUsers();
        //Task<bool> UpdateUser(User user);
        //Task<bool> DeleteUser(int id);
    }
}
