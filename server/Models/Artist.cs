using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Artists")]
    public class Artist
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("artist_name")]
        public string ArtistName { get; set; }

        [MaxLength(255)]
        [Column("description")]
        public string Description { get; set; }

        public ICollection<ArtistAlbum>? Albums { get; set; }
    }
}
