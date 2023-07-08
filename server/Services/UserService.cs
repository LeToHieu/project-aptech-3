using MediaWebApi.Models;
using MediaWebApi.Repositories;
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
        public async Task<User?> RegisterUser(RegisterViewModel user)
        {
            //var existUserByUserName = await _userRepository.GetByUserName(user.Username ?? "");
            //if (existUserByUserName != null)
            //{
            //    throw new ArgumentException("Username already exists");
            //}

            //var existUserByEmail = await _userRepository.GetByEmail(user.Email ?? "");
            //if (existUserByEmail != null)
            //{
            //    throw new ArgumentException("Email already exists");
            //}
            User? newUser = await _userRepository.AddUser(user);
            return newUser;

        }
    }
}
