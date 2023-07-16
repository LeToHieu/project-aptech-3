using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Artist_Album")]
    public class ArtistAlbum
    {
        [Key]
        [ForeignKey("Artists")]
        [Column("artist_id")]
        public int ArtistId { get; set; }

        public Artist? Artist { get; set; }

        [Key]
        [ForeignKey("Albums")]
        [Column("album_id")]
        public int AlbumId { get; set; }

        public Album? Album { get; set; }
    }
}
