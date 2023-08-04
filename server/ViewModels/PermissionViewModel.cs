using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class PermissionViewModel
    {
        public int Id { get; set; }
        [Required]
        public string permission { get; set; } = "";
    }
}
