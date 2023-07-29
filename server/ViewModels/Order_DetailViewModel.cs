using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace MediaWebApi.ViewModels
{
    public class Order_DetailViewModel
    {
        public int Id { get; set; }

        [Required]        
        public int order_id { get; set; }

        public int album_id { get; set; }

        public int media_id { get; set; }

        public byte? status_order { get; set; } = 0;

        [Required]
        public decimal? price { get; set; } = decimal.Zero;
    }
}
