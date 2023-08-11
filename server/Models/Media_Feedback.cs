using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Media_Feedback")]
    public class Media_Feedback
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Medias")]
        [Column("media_id")]
        public int mediaId { get; set; }

        [Required]
        [ForeignKey("Feedbacks")]
        [Column("feedback_id")]
        public int feedbackId { get; set; }

        public Feedback? Feedback { get; set; }

        public Media? Media { get; set; }
    }
}
