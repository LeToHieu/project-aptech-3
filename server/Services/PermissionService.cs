using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;
using System.Security;
using static MediaWebApi.Models.Permissions;
namespace MediaWebApi.Services
{
    public class PermissionService : IPermissionService
    {
        public readonly IPermissionRepository _permissionRepository;
        public PermissionService(IPermissionRepository permission)
        {
            _permissionRepository = permission; 
        }
        public async Task<List<Permissions?>?> GetAllPermission()
        {
            return await _permissionRepository.GetAllPermission();  
        }
        public async Task<Permissions?> GetPermissionById(int id)
        {
            return await _permissionRepository.GetPermissionById(id);   
        }
         public async Task<Permissions?> AddPermission(PermissionViewModel permission)
        {
            return await _permissionRepository.AddPermission(permission);   
        }
        public async Task<bool?> UpdatePermission(PermissionViewModel permission)
        {
            var checkExisting = _permissionRepository.GetPermissionById(permission.Id);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _permissionRepository.UpdatePermission(permission);
        }
        public async Task<bool?> DeletePermission(int id)
        {
            var checkExisting = _permissionRepository.GetPermissionById(id);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _permissionRepository.DeletePermission(id);
        }
    }
}
