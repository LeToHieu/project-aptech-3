using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class FeedbackViewModel
    {
        [Required]
        public int userId { get; set; }

        public string content { get; set; }
    }
}
