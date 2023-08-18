using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class ArtistAlbumViewModel
    {
        [Required(ErrorMessage = "AlbumId is required")]
        [Column("album_id")]
        public int AlbumId { get; set; }

        [Required(ErrorMessage = "ArtitstId is required")]
        [Column("artist_id")]
        public int ArtistId { get; set; }
    }
}
