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

            if (newUser == null)
            {
                throw new ArgumentException("Can not create media");
            }

            return newUser;

        }

        public async Task<string?> Login(LoginViewModel loginUser)
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

        public async Task<List<User?>?> GetAllUsers()
        {
            List<User?> users = await _context.Users.ToListAsync();
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

        public async Task<User?> UpdateUser(UserViewModel user)
        {

            string sql = "EXECUTE UpdateUser @UserId, @Username, @UserImage, @Password, @Email,@Phone, @Role";
            IEnumerable<User> result = await _context.Users.FromSqlRaw(sql,
                                    new SqlParameter("@UserId", user.Id),
                                    new SqlParameter("@Username", user.Username),
                                    new SqlParameter("@UserImage", user.Userimage),
                                    new SqlParameter("@Password", user.Password),
                                    new SqlParameter("@Email", user.Email),
                                    new SqlParameter("@Phone", user.Phone),
                                    new SqlParameter("@Role", user.Role)
                                ).ToListAsync();

            User? newUser = result.FirstOrDefault();
            if (newUser == null)
            {
                throw new ArgumentException("Can not update user");
            }
            return newUser;
        }

        public async Task<bool?> DeleteUser(int id)
        {

            var user = await _context.Users.FindAsync(id);        

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetById(int userId)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new ArgumentException("User not found");

            }
            return user;
        }

        public async Task<string?> UpLoadFile(IFormFile file)
        {
            string type = "";
            bool flag = false;
            var allowedExtensionsVideo = new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv" };
            var fileExtensionVideo = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsVideo.Contains(fileExtensionVideo))
            {
                type = "Videos";
                flag = true;
            }
            var allowedExtensionsImage = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
            var fileExtensionImage = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsImage.Contains(fileExtensionImage))
            {
                type = "Images";
                flag = true;
            }
            var allowedExtensionsSong = new[] { ".mp3", ".wav" };
            var fileExtensionSong = Path.GetExtension(file.FileName).ToLower();
            if (allowedExtensionsSong.Contains(fileExtensionSong))
            {
                type = "Songs";
                flag = true;
            }
            if (!flag)
            {
                throw new ArgumentException("Can not upload this file");
            }

            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No file was uploaded");
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine("Uploads/" + type, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return type + "/" + fileName;
        }

    }

}
