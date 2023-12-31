﻿using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services.Interface
{
    public interface IUserService
    {
        Task<List<User?>?> GetAllUsers();

        Task<User?> InsertUser(UserViewModel user);
        Task<User?> RegisterUser(RegisterViewModel user);
        Task<User?> GetUserById(int userId);
        Task<string> LoginUser(LoginViewModel loginUser);
        Task<User?> UpdateUser(UserViewModel user);
        Task<bool?> DeleteUser(int id);
    }
}
