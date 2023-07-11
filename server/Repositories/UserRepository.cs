using MediaWebApi.Models;
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
    public class UserRepository : IUserRepository
    {
        private readonly MediaContext _context;
        private readonly IConfiguration _config;
        public UserRepository (MediaContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
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

        public async Task<string> Login(LoginViewModel loginUser)
        {
            string sql = "EXECUTE LoginUser @Username, @Password";
            IEnumerable<User> result = await _context.Users.FromSqlRaw(sql,
                                    new SqlParameter("@username", loginUser.Username),
                                    new SqlParameter("@password", loginUser.Password)
                                ).ToListAsync();

            User? user = result.FirstOrDefault();

            if (user != null)
            {
                //tạo ra jwt string để gửi cho client
                // Nếu xác thực thành công, tạo JWT token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_config["Jwt:SecretKey"] ?? "");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(30),
                    SigningCredentials = new SigningCredentials
                        (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                return jwtToken;
            }else
            {
                throw new ArgumentException("Wrong password");
            }
        }

        public async Task<List<User>?> GetAllUsers()
        {
            List<User> users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<User?> GetByEmail(string email)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<User?> GetByUserName(string username)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            return user;
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<User?> GetById(int userId)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return user;
        }
    }
}
