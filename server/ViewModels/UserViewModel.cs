using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = "";
        public string Userimage { get; set; } = ".";

        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; } = "";

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = "";


        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Role is required")]
        public int Role { get; set; } = 0;

        public IFormFile? fileImage { get; set; }
    }

}

