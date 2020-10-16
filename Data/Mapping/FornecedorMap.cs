using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mapping
{
    public class FornecedorMap : IEntityTypeConfiguration<FornecedorEntity>
    {
        public void Configure(EntityTypeBuilder<FornecedorEntity> builder)
        {
            builder.ToTable("Fornecedor");
            builder.HasKey(p => p.Id).HasName("PkFornecedor");
            builder.Property(c => c.Nome).IsRequired();
            builder.Property(c => c.CPFCNPJ).IsRequired();
            builder.Property(c => c.DataCadastro).IsRequired();
            builder.Property(c => c.RG);
            builder.Property(c => c.DataNascimento);
            builder.HasOne(bld => bld.Empresa)
                .WithMany(bld => bld.Fornecedor)
                .HasForeignKey(bld => bld.EmpresaId)
                .HasPrincipalKey(bld => bld.Id)
                .HasConstraintName("FKEmpresa")
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
