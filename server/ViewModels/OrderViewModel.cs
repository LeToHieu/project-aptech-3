﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace MediaWebApi.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }

        [Required]
        public int userId { get; set; }

        public DateTime? orderDate { get; set; }

        [Required]
        public decimal? total_amount { get; set; } = decimal.Zero;

    }
}