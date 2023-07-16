using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class AlbumViewModel
    {
        [Required(ErrorMessage = "Album name is required")]
        [StringLength(255, ErrorMessage = "Album name cannot be longer than 255 characters")]
        [Column("album_name")]
        public string AlbumName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, 1000000000, ErrorMessage = "Price must be between 0 and 1000000000")]
        [Column("price")]
        public decimal Price { get; set; }

        [StringLength(255, ErrorMessage = "Description cannot be longer than 255 characters")]
        [Column("description")]
        public string Description { get; set; }
    }
}
