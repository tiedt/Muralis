using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repository
{
    public interface IFornecedorRepository : IBaseRepository<FornecedorEntity>
    {
          Task<FornecedorEntity> GetFornecedorAsyncById(int EventoId);

          Task<FornecedorEntity[]> GetFornecedorAsync();
    }
}
