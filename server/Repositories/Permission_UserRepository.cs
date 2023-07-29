using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
namespace MediaWebApi.Repositories
{
    public class Permission_UserRepository : IPermission_UserRepository
    {
        private readonly MediaContext _context;
        public Permission_UserRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Permission_User?>?> GetAllPermission_User()
        {
            return await _context.Permission_User.ToListAsync();
        }
        public async Task<Permission_User?> GetPermission_UserById(int id)
        {
            Permission_User? permission_user = await _context.Permission_User.FindAsync(id);
            if (permission_user == null)
            {
                throw new ArgumentException("permission_user not found");

            }
            return permission_user;
        }
        public async Task<Permission_User?> AddPermission_User(Permission_UserViewModel Permission_User)
        {
            string sql = "EXECUTE InsertPermissionUser @user_id, @permission_id";
            IEnumerable<Permission_User> result = await _context.Permission_User.FromSqlRaw(sql,
                    new SqlParameter("@user_id", Permission_User.userId),
                    new SqlParameter("@permission_id", Permission_User.permissionId)


            ).ToListAsync();
            Permission_User? permission_User = result.FirstOrDefault();

            return permission_User;
        }
        public async Task<bool?> UpdatePermission_User(Permission_UserViewModel Permission_User)
        {
            string sql = "EXECUTE UpdatePermissionUser @user_id, @permission_id";
            IEnumerable<Permission_User> result = await _context.Permission_User.FromSqlRaw(sql,
                    new SqlParameter("@permission_id", Permission_User.permissionId),
                    new SqlParameter("@user_id", Permission_User.userId)

            ).ToListAsync();
            Permission_User? permission_User = result.FirstOrDefault();
            if (permission_User == null)
            {
                throw new ArgumentException("Can not update permission_User");
            }
            return true;
        }
        public async Task<bool?> DeletePermission_User(int id)
        {
            var permission_User = await _context.Permission_User.FindAsync(id);

            if (permission_User == null)
            {
                return false;
            }
            _context.Permission_User.Remove(permission_User);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
