using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class Permission_UserService: IPermission_UserService
    {
        public readonly IPermission_UserRepository _permission_UserRepository;
        public Permission_UserService(IPermission_UserRepository permission_UserRepository)
        {
            _permission_UserRepository = permission_UserRepository;
        }

        public async Task<List<Permission_User?>?> GetAllPermission_User()
        {
            return await _permission_UserRepository.GetAllPermission_User();    
        }
        public async Task<Permission_User?> GetPermission_UserById(int id)
        {
            return await _permission_UserRepository.GetPermission_UserById(id);
        }
        public async Task<Permission_User?> AddPermission_User(Permission_UserViewModel Permission_User)
        {
            return await _permission_UserRepository.AddPermission_User(Permission_User);
        }
        public async Task<bool?> UpdatePermission_User(Permission_UserViewModel Permission_User)
        {
            var checkExisting = _permission_UserRepository.GetPermission_UserById(Permission_User.userId);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _permission_UserRepository.UpdatePermission_User(Permission_User);
        }
        public async Task<bool?> DeletePermission_User(int id)
        {
            var checkExisting = _permission_UserRepository.GetPermission_UserById(id);
            if (checkExisting == null) { throw new ArgumentException("Id not found"); }
            return await _permission_UserRepository.DeletePermission_User(id);
        }
    }
}
