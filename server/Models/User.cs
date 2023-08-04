using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }


        [Required(ErrorMessage = "Username is required")]
        [Column("username")]
        public string Username { get; set; } = "";


        [Column("userimage")]
        public string Userimage { get; set; } = ".";


        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number")]
        [Column("phone")]
        public string Phone { get; set; } = "";

        [Required(ErrorMessage = "Password is required")]
        [Column("password")]
        public string Password { get; set; } = "";


        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Column("email")]
        public string Email { get; set; } = "";

        [Column("role")]
        public int Role { get; set; } = 0;

  
    }
}
