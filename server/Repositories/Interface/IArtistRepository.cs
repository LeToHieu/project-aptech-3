﻿using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IArtistRepository
    {
        Task<List<Artist?>?> GetArtists();
        Task<Artist?> GetArtistById(int id);
        Task<Artist?> CreateArtist(ArtistViewModel artist);
        Task<bool?> UpdateArtist(ArtistViewModel artist);
        Task<bool?> DeleteArtist(int id);
        Task<string?> UpLoadFile(IFormFile file);

    }
}
