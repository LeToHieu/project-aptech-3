using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MediaWebApi.Models
{
    [Table("Order_Detail")]
    public class Order_Detail
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [ForeignKey("Orders")]
        [Column("order_id")]
        public int order_id { get; set; }

        [ForeignKey("Albums")]
        [Column("album_id")]
        public int album_id { get; set; }

        [ForeignKey("Medias")]
        [Column("media_id")]
        public int media_id { get; set; }

        [Column("status_order")]
        public byte? status_order { get; set; }

        [Required]
        [Column("price")]
        public decimal? price { get; set; }
    }
}
