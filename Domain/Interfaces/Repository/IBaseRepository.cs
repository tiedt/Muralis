using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repository
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        Task InsertAsync(T item);
        Task UpdateAsync(T item);
        Task DeleteByIdAsync(int id);
        Task<T> ObterPorIdAsync(int id);
        Task<IEnumerable<T>> ObterTodosAsync();
        Task<T> GetByIdAsync(int id);
        T GetById(int id);

        void DeleteRange<T>(T[] entity) where T : class;

    }
}
