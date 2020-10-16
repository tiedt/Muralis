using Data.Context;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Data.Repository
{
    class FornecedorRepository : BaseRepository<FornecedorEntity>, IFornecedorRepository
    {
        private readonly DatabaseContext _context;

        public FornecedorRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
    }
}