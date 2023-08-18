using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class ArtistMediaViewModel
    {
        [Required(ErrorMessage = "AlbumId is required")]
        [Column("artist_id")]
        public int ArtistId { get; set; }

        [Required(ErrorMessage = "ArtitstId is required")]
        [Column("media_id")]
        public int MediaId { get; set; }
    }
}
