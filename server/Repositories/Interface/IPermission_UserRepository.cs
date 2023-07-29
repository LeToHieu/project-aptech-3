using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Repositories.Interface
{
    public interface IPermission_UserRepository
    {
        Task<List<Permission_User?>?> GetAllPermission_User();
        Task<Permission_User?> GetPermission_UserById(int id);
        Task<Permission_User?> AddPermission_User(Permission_UserViewModel Permission_User);
        Task<bool?> UpdatePermission_User(Permission_UserViewModel Permission_User);
        Task<bool?> DeletePermission_User(int id);
    }
}
