﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MediaWebApi.Models
{

    [Table("Orders")]
    public class Orders
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Users")]
        [Column("user_id")]
        public int userId { get; set; }

        [Column("order_date")]
        public DateTime? orderDate { get; set; }

        [Required]
        [Column("total_amount")]
        public decimal? total_amount { get; set; }

        [Column("status_order")]
        public int? status_order { get; set; }
        public ICollection<Order_Detail>? Order_Detail { get; set; }

        public User User { get; set; }
    }
}
