using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
   public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) 
        {
        }

        public DbSet<FaleConoscoEntity> FaleConosco { get; set; }
        public DbSet<QuemSomosEntity> QuemSomos{ get; set; }

    }
}
