using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MediaWebApi.Models;

namespace MediaWebApi.ViewModels
{
    public class Order_DetailViewModel
    {

        [Required]        
        public int OrderId { get; set; }

        public int? AlbumId { get; set; }

        public int? MediaId { get; set; }

        [Required]
        public decimal? Price { get; set; } = decimal.Zero;
        
    }
}
