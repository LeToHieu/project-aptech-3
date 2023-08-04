using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace MediaWebApi.ViewModels
{
    public class Permission_UserViewModel
    {

        [Required]
        public int permissionId { get; set; }

        [Required]
        public int userId { get; set; }
    }
}
