using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MediaWebApi.Repositories
{
    public class PermissionRepository:IPermissionRepository
    {
        private readonly MediaContext _context;
        public PermissionRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Permissions?>?> GetAllPermission()
        {
            return await _context.Permissions.ToListAsync();
        }
        public async Task<Permissions?> GetPermissionById(int id)
        {
            Permissions? permission = await _context.Permissions.FindAsync(id);
            if (permission == null)
            {
                throw new ArgumentException("Permission not found");

            }
            return permission;
        }
        public async Task<Permissions?> AddPermission(PermissionViewModel permission)
        {
            string sql = "EXECUTE InsertPermission @permission";
            IEnumerable<Permissions> result = await _context.Permissions.FromSqlRaw(sql,
                    new SqlParameter("@user_id", permission.permission)

            ).ToListAsync();
            Permissions? permissions = result.FirstOrDefault();

            return permissions;
        }
        public async Task<bool?> UpdatePermission(PermissionViewModel permission)
        {
            string sql = "EXECUTE UpdatePermission @Id, @permission";
            IEnumerable<Permissions> result = await _context.Permissions.FromSqlRaw(sql,
                                    new SqlParameter("@Id", permission.Id),
                                    new SqlParameter("@permission", permission.permission)
                                ).ToListAsync();
            Permissions? updatePermission = result.FirstOrDefault();
            if (updatePermission == null)
            {
                throw new ArgumentException("Can not update permission");
            }
            return true;
        }
        public async Task<bool?> DeletePermission(int id)
        {
            var permissions = await _context.Permissions.FindAsync(id);

            if (permissions == null)
            {
                return false;
            }
            _context.Permissions.Remove(permissions);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
