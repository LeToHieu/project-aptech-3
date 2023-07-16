using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class CategoryViewModel
    {
        [Required]
        [MaxLength(255)]
        [Column("category_name")]
        public string CategoryName { get; set; } = "";

        [MaxLength(255)]
        [Column("description")]
        public string Description { get; set; } = "";
    }
}
