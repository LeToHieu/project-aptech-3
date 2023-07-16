using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class ArtistViewModel
    {
        [Required]
        [MaxLength(255)]
        [Column("artist_name")]
        public string ArtistName { get; set; }

        [MaxLength(255)]
        [Column("description")]
        public string Description { get; set; }
    }
}
