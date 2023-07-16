using MediaWebApi.Models;
using MediaWebApi.Repositories;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IAlbumRepository _albumRepository;

        public AlbumService(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }
        public async Task<Album?> CreateAlbum(AlbumViewModel album)
        {
            if (album.AlbumName == null)
            {
                throw new ArgumentException("album name must be required");
            }
            return await _albumRepository.CreateAlbum(album);
        }

        public async Task<bool?> DeleteAlbum(int id)
        {
            var existingAlbum = await _albumRepository.GetAlbumById(id);
            if (existingAlbum == null)
            {
                throw new ArgumentException("Id not found");
            }
            return await _albumRepository.DeleteAlbum(id);
        }

        public async Task<Album?> GetAlbumById(int id)
        {
            return await _albumRepository.GetAlbumById(id);
        }

        public async Task<List<Album?>?> GetAllAlbums()
        {
            return await _albumRepository.GetAllAlbums();
        }

        public async Task<bool?> UpdateAlbum(Album album)
        {
            var existingAlbum = await _albumRepository.GetAlbumById(album.Id);
            if (existingAlbum == null)
            {
                throw new ArgumentException("Id not found");
            }
            return await _albumRepository.UpdateAlbum(album);
        }
    }
}
