using MediaWebApi.Models;
using MediaWebApi.ViewModels;
namespace MediaWebApi.Repositories.Interface
{
    public interface IPermissionRepository
    {
        Task<List<Permissions?>?> GetAllPermission();
        Task<Permissions?> GetPermissionById(int id);
        Task<Permissions?> AddPermission(PermissionViewModel permission);
        Task<bool?> UpdatePermission(PermissionViewModel permission);
        Task<bool?> DeletePermission(int id);
    }
}
