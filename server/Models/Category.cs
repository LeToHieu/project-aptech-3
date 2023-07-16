using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Categories")]
    public class Category
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("category_name")]
        public string CategoryName { get; set; }

        [MaxLength(255)]
        [Column("description")]
        public string Description { get; set; }
    }
}
