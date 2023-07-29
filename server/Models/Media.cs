using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.Models
{
    [Table("Medias")]
    public class Media
    {
        [Key]
        [Column("Id")]    
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("media_name")]
        public string MediaName { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("media_image")]
        public string MediaImage { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("media_url")]
        public string MediaUrl { get; set; }

        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        [Required]
        [ForeignKey("Categories")]
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("duration")]
        public decimal Duration { get; set; } = decimal.Zero;


        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        public Category Category { get; set; }
    }
}
