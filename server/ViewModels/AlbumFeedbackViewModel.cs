using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.ViewModels
{
    public class AlbumFeedbackViewModel
    {
        [Required]
        public int albumId { get; set; }

        [Required]
        public int feedbackId { get; set; }
    }
}
