using MediaWebApi.Models;
using MediaWebApi.ViewModels;

namespace MediaWebApi.Repositories.Interface
{
    public interface IAlbumRepository
    {
        Task<List<Album?>?> GetAllAlbums();
        Task<Album?> GetAlbumById(int id);
        Task<Album?> CreateAlbum(AlbumViewModel album);
        Task<bool?> UpdateAlbum(Album album);
        Task<bool?> DeleteAlbum(int id);
    }
}
