using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Albums")]
    public class Album
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Album name is required")]
        [StringLength(255, ErrorMessage = "Album name cannot be longer than 255 characters")]
        [Column("album_name")]
        public string? AlbumName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, 1000000000, ErrorMessage = "Price must be between 0 and 1000000000")]
        [Column("price")]
        public decimal Price { get; set; }

        [StringLength(255, ErrorMessage = "Description cannot be longer than 255 characters")]
        [Column("description")]
        public string? Description { get; set; }

        public ICollection<ArtistAlbum>? Artists { get; set; }
    }
}
