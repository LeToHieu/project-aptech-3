using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class PromotionViewModal
    {
        [Required]
        public string PromotionName { get; set; }
        
        [Required]
        public Decimal Discount { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
