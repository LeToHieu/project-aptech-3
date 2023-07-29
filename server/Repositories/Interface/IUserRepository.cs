using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User?> AddUser(RegisterViewModel user);
        Task<User?> GetByUserName(string username);
        Task<User?> GetByEmail(string email);
        Task<User?> GetById(int userId);
        Task<List<User?>?> GetAllUsers();
        Task<bool?> UpdateUser(User user);
        Task<bool?> DeleteUser(int id);
        Task<string?> Login(LoginViewModel loginUser);
    }
}
