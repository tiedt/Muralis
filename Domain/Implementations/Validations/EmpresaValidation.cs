using Domain.Entities;
using static Domain.Shared.Validacao;

namespace Domain.Implementations
{
    public static class EmpresaValidation
    {
        public static string ValidarCNPJEmpresa(string cnpj)
        {
            if (!ValidaCNPJ.IsCnpj(cnpj))
            {
                return "CNPJ não é válido";
            }
            return "";
        }
    }
}
