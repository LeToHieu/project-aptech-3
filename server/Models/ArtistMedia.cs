using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Artist_Media")]
    public class ArtistMedia
    {
        [Key]
        [ForeignKey("Artists")]
        [Column("artist_id")]
        public int ArtistId { get; set; }

        public Artist? Artist { get; set; }

        [Key]
        [ForeignKey("Medias")]
        [Column("media_id")]
        public int MediaId { get; set; }

        public Media? Media { get; set; }
    }
}
