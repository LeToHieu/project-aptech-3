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

        [Required]
        [ForeignKey("Orders")]
        [Column("order_id")]
        public int OrderId { get; set; }

        [ForeignKey("Albums")]
        [Column("album_id")]
        public int? AlbumId { get; set; }

        [ForeignKey("Medias")]
        [Column("media_id")]
        public int? MediaId { get; set; }

        [Required]
        [Column("price")]
        public decimal? price { get; set; }
        public Orders? Order { get; set; }
        public Album? Album { get; set; }
        public Media? Media { get; set; }
    }
}
