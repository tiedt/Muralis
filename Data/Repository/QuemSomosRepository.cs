using Data.Context;
using Domain.Entities;

namespace Data.Repository
{
    public class QuemSomosRepository : BaseRepository<QuemSomosEntity>, IQuemSomosRepository
    {
        private readonly DatabaseContext _context;

        public QuemSomosRepository(DatabaseContext context) : base(context)
        {
            _context = context;
        }
    }
}
