using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class MediaViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string MediaName { get; set; } = "";

        [MaxLength(255)]
        public string MediaImage { get; set; } = "";

        [MaxLength(255)]
        public string MediaUrl { get; set; } = "";

        [Required]
        public decimal Price { get; set; } = decimal.Zero;

        [Required]
        public int CategoryId { get; set; }

        public decimal Duration { get; set; } = decimal.Zero;

        public DateTime? Created_At { get; set; }
        public IFormFile? fileImage { get; set; }
        public IFormFile? fileVideo { get; set; }

    }
}
