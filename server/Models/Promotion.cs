using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Promotions")]
    public class Promotion
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("promotion_name")]
        public string PromotionName { get; set; }

        [Required]
        [Column("discount")]
        public Decimal Discount { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("start_date")]
        public DateTime? StartDate { get; set; }

        [Column("end_date")]
        public DateTime? EndDate { get; set; }

    }
}
