using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories
{
    public interface IUserRepository
    {
        Task<User?> AddUser(RegisterViewModel user);
        Task<User> GetByUserName(string username);
        Task<User> GetByEmail(string email);
        Task<List<User>> GetAllUsers();
        Task<bool> UpdateUser(User user);
        Task<bool> DeleteUser(int id);
    }
}
