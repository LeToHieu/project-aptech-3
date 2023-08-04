using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<User?> CreateUser(UserViewModel user)
        {
            throw new NotImplementedException();
        }

        public async Task<bool?> DeleteUser(int id)
        { 
            var existingUser = await _userRepository.GetById(id);
            
            if (existingUser != null)
            {
                if (existingUser.Userimage != "." && existingUser.Userimage != "string" && existingUser.Userimage != " " && existingUser.Userimage != "")
                {
                    File.Delete("Uploads/" + existingUser.Userimage);
                }

                return await _userRepository.DeleteUser(id);
            }
            throw new Exception("Id not found");
        }

        public async Task<User?> UpdateUser(UserViewModel user)
        {

            var existingUser = await _userRepository.GetById(user.Id);
            if (existingUser == null)
            {
                throw new ArgumentException("User not found");
            }

            var urlImage = ".";

            if (user.fileImage != null)
            {
                urlImage = await _userRepository.UpLoadFile(user.fileImage);
                if (existingUser.Userimage != "." && existingUser.Userimage != "string" && existingUser.Userimage != " " && existingUser.Userimage != "")
                {
                    File.Delete("Uploads/" + existingUser.Userimage);
                }
            }
            else
            {
                urlImage = existingUser.Userimage;
            }

            user.Userimage = urlImage;

            return await _userRepository.UpdateUser(user);
            
        }




        public async Task<List<User?>?> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }

        public async Task<User?> GetUserById(int userId)
        {
            return await _userRepository.GetById(userId);
        }

        public async Task<string> LoginUser(LoginViewModel loginUser)
        {
            var existUserByUserName = await _userRepository.GetByUserName(loginUser.Username ?? "");
            if (existUserByUserName == null)
            {
                throw new ArgumentException("User name not found");
            }

            return await _userRepository.Login(loginUser);
        }

        public async Task<User?> RegisterUser(RegisterViewModel user)
        {
            var existUserByUserName = await _userRepository.GetByUserName(user.Username ?? "");
            if (existUserByUserName != null)
            {
                throw new ArgumentException("Username already exists");
            }

            var existUserByEmail = await _userRepository.GetByEmail(user.Email ?? "");
            if (existUserByEmail != null)
            {
                throw new ArgumentException("Email already exists");
            }

            var urlImage = ".";

            if (user.fileImage != null)
            {
                urlImage = await _userRepository.UpLoadFile(user.fileImage);
            }

            user.Userimage = urlImage;

            User? newUser = await _userRepository.AddUser(user);
            return newUser;

        }
    }
}
