using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class ArtistViewModel
    {
        public int Id { get; set; } = 0;
        [Required]
        [MaxLength(255)]
        [Column("artist_name")]
        public string ArtistName { get; set; }

        [MaxLength(255)]
        [Column("artist_image")]
        public string? ArtistImage { get; set; }

        [MaxLength(255)]
        [Column("description")]
        public string Description { get; set; }

        public IFormFile? file { get; set; }
    }
}
