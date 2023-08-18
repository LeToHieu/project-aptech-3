using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebApi.Models
{
    [Table("Feedbacks")]
    public class Feedback
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Users")]
        [Column("user_id")]
        public int userId { get; set; }

        [Column("content")]
        public string content { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        public Media_Feedback? Media_Feedback { get; set; }
        public User User { get; set; }
    }
}
