using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
   public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) 
        {
        }

        public DbSet<EmpresaEntity> Empresa { get; set; }

    }
}
