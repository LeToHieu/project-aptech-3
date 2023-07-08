using MediaWebApi.Models;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace MediaWebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MediaContext _context;

        public UserRepository (MediaContext context)
        {
            _context = context;
        }

        public async Task<User?> AddUser(RegisterViewModel user)
        {
            string sql = "EXECUTE RegisterUser @Username, @UserImage, @Password, @Phone, @Email";
            IEnumerable<User> result = await _context.Users.FromSqlRaw(sql,
                                    new SqlParameter("@username", user.Username),
                                    new SqlParameter("@userimage", user.Userimage),
                                    new SqlParameter("@password", user.Password),
                                    new SqlParameter("@phone", user.Phone),
                                    new SqlParameter("@email", user.Email)
                                ).ToListAsync();

            User? newUser = result.FirstOrDefault();

            return newUser;

        }

        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<User>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetByUserName(string username)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
