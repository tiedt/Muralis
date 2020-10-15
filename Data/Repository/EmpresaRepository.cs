using Data.Context;
using Data.Repository;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Data.Interfaces.Repository
{
    public class EmpresaRepository : BaseRepository<EmpresaEntity>, IEmpresaRepository
    {
        private readonly DatabaseContext _context;

        public EmpresaRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
    }
}
