using Microsoft.EntityFrameworkCore;

namespace MediaWebApi.Models
{
    public class MediaContext : DbContext
    {
        public MediaContext(DbContextOptions<MediaContext> options)
        : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<ArtistAlbum> ArtistAlbums { get; set; }
        public DbSet<ArtistMedia> ArtistMedias { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ArtistAlbum>().HasKey(aa => new { aa.ArtistId, aa.AlbumId });
            modelBuilder.Entity<ArtistMedia>().HasKey(aa => new { aa.ArtistId, aa.MediaId });
        }
    }
}
