using Data.Context;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repository
{
    class FornecedorRepository : BaseRepository<FornecedorEntity>, IFornecedorRepository
    {
        private readonly DatabaseContext _context;

        public FornecedorRepository(DatabaseContext context) : base(context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<FornecedorEntity[]> GetFornecedorAsync()
        {
            IQueryable<FornecedorEntity> query = _context.Fornecedor.Include(c => c.TelefoneFornecedor);
            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        async Task<FornecedorEntity> IFornecedorRepository.GetFornecedorAsyncById(int FornecedorId)
        {
            IQueryable<FornecedorEntity> query = _context.Fornecedor.Include(c => c.TelefoneFornecedor);

            query = query.AsNoTracking().OrderBy(c => c.Id);

            return await query.FirstOrDefaultAsync();

        }
    }
}