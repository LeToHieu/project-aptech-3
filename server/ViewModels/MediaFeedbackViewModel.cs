using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class MediaFeedbackViewModel
    {
        [Required]
        public int mediaId { get; set; }

        [Required]
        public int feedbackId { get; set; }
    }
}
