using Data.Context;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly DatabaseContext _context;
        private DbSet<T> _dataSet;
        public BaseRepository(DatabaseContext context)
        {
            _context = context;
            _dataSet = context.Set<T>();
        }
        public async Task DeleteByIdAsync(int id)
        {
            try
            {
                T entity = await GetByIdAsync(id);
                _context.Entry(entity).State = EntityState.Deleted;
                _dataSet.Remove(entity);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task InsertAsync(T entities)
        {
            try
            {
                    _dataSet.Add(entities);

                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<T> ObterPorIdAsync(int id)
        {
            try
            {
                return await _dataSet.SingleOrDefaultAsync(p => p.Id.Equals(id));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<T>> ObterTodosAsync()
        {
            try
            {
                return await _dataSet.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateAsync(T item)
        {
            try
            {
                T entityDb = GetById(item.Id);
                _context.Entry(entityDb).State = EntityState.Modified;
                _context.Entry(entityDb).CurrentValues.SetValues(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }

        }

        public T GetById(int id)
        {
            var entityResult = _context.Set<T>().Find(id);

            if (entityResult is null)
            {
                throw new Exception($"Nenhum resultado encontrado para o id: {id}.");
            }

            return entityResult;
        }


        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<T> GetByIdAsync(int id) => await Task.Run(() => GetById(id));
    }
}
