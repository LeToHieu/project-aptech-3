using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MediaWebApi.Models
{
    [Table("Permissions")]
    public class Permissions
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("permission_name")]
        public string permission { get; set; } = "";

    }
}
