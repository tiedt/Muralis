using Domain.Entities;
using System;
using System.Threading.Tasks;
using static Domain.Shared.Validacao;

namespace Domain.Implementations.Validations
{
    public static class FornecedorValidation
    {
        public static async Task<string> ValidaFornecedor(FornecedorEntity fornecedor, EmpresaEntity empresa)
        {
            if (fornecedor.TipoFornecedor == TipoFornecedor.Fisico)
            {
                if (!ValidaCPF.IsCpf(fornecedor.CPFCNPJ))
                    return "CPF Inválido";

                if (empresa.UF == UnidadeFederacaoSigla.PR && fornecedor.DataNascimento.Value.AddYears(18) >= DateTime.Now)
                    return "Fornecedor não pode ser cadastrado por ser menor de idade";

                return "";

            }
            return EmpresaValidation.ValidarCNPJEmpresa(empresa.CNPJ);
        }
    }

}


