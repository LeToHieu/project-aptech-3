﻿using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User?> InsertUser(UserViewModel user);
        Task<User?> AddUser(RegisterViewModel user);
        Task<User?> GetByUserName(string username);
        Task<User?> GetByEmail(string email);
        Task<User?> GetById(int userId);
        Task<List<User?>?> GetAllUsers();
        Task<User?> UpdateUser(UserViewModel user);
        Task<bool?> DeleteUser(int id);
        Task<string?> Login(LoginViewModel loginUser);

        Task<string?> UpLoadFile(IFormFile file);
    }
}
