using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediaWebApi.Models
{
    public class Album_Feedback
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Albums")]
        [Column("album_id")]
        public int albumId { get; set; }

        [Required]
        [ForeignKey("Feedbacks")]
        [Column("feedback_id")]
        public int feedbackId { get; set; }

        public Feedback? Feedback { get; set; }
        public Album? Album { get; set; }
    }
}
