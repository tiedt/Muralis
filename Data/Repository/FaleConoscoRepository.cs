using Data.Context;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Data.Repository
{
    public class FaleConoscoRepository : BaseRepository<FaleConoscoEntity>, IFaleConoscoRepository
    {
        private readonly DatabaseContext _context;

        public FaleConoscoRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
    }
}
