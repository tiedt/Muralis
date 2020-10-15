using Data.Interfaces.Repository;
using Domain.Interfaces.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace Data.Services
{
    public static  class ServiceProvider
    {
        public static void Register(IServiceCollection services)
        {
            services.AddTransient<IEmpresaRepository, EmpresaRepository>();
        }
    }
}
