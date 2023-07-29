using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MediaWebApi.Models
{
    [Table("Permission_User")]
    public class Permission_User
    {
        [Key]
        [Required]
        [ForeignKey("Users")]
        [Column("user_id")]
        public int userId { get; set; }

        [Required]
        [ForeignKey("Permissions")]
        [Column("permission_id")]
        public int permissionId { get; set; }
    }

}
