using Data.Mapping;
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
        public DbSet<FornecedorEntity> Fornecedor { get; set; }

    }
}
