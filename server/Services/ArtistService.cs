using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.Services.Interface;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class ArtistService : IArtistService
    {
        private readonly IArtistRepository _artistRepository;

        public ArtistService(IArtistRepository artistRepository)
        {
            _artistRepository = artistRepository;
        }
        public async Task<Artist?> CreateArtist(ArtistViewModel artist)
        {
            if (artist.ArtistName == null)
            {
                throw new ArgumentException("Artist name must be required");
            }
            var path = ".";

            if (artist.file != null)
            {
                path = await _artistRepository.UpLoadFile(artist.file);
            }
            artist.ArtistImage = path;
            return await _artistRepository.CreateArtist(artist);
        }

        public async Task<bool?> DeleteArtist(int id)
        {
            var existingArtist = await _artistRepository.GetArtistById(id);
            if (existingArtist == null)
            {
                throw new ArgumentException("Id not found");
            }
            if (existingArtist.ArtistImage != "." && existingArtist.ArtistImage != "string" && existingArtist.ArtistImage != " " && existingArtist.ArtistImage != "")
            {
                File.Delete("Uploads/" + existingArtist.ArtistImage);
            }
            return await _artistRepository.DeleteArtist(id);
        }

        public async Task<Artist?> GetArtistById(int id)
        {
            return await _artistRepository.GetArtistById(id);
        }

        public async Task<List<Artist?>?> GetArtists()
        {
            return await _artistRepository.GetArtists();
        }

        public async Task<bool?> UpdateArtist(ArtistViewModel artist)
        {
            var existingArtist = await _artistRepository.GetArtistById(artist.Id);
            if (existingArtist == null)
            {
                throw new ArgumentException("Id not found");
            }
            var path = ".";

            if (artist.file != null)
            {
                path = await _artistRepository.UpLoadFile(artist.file);
                if (existingArtist.ArtistImage != "." && existingArtist.ArtistImage != "string" && existingArtist.ArtistImage != " " && existingArtist.ArtistImage != "")
                {
                    File.Delete("Uploads/" + existingArtist.ArtistImage);
                }
            }
            else
            {
                path = existingArtist.ArtistImage;
            }

            artist.ArtistImage = path;
            return await _artistRepository.UpdateArtist(artist);
        }
    }
}
