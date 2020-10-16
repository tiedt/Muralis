using Domain.Entities;
using Domain.Interfaces.Repository;
using System;
using System.Threading.Tasks;
using static Domain.Shared.Validacao;

namespace Domain.Implementations.Validations
{
    public class FornecedorValidation
    {
        protected readonly IEmpresaRepository _empresaRepository;
        public FornecedorValidation()
        {

        }
        public async Task<string> ValidaFornecedor(FornecedorEntity fornecedor, EmpresaEntity empresa)
        {
            var mensagem = "";
            try
            {
                if (fornecedor.CPFCNPJ.Length == 11)
                {
                    var validaCPF = ValidaCPF.IsCpf(fornecedor.CPFCNPJ);
                    if (empresa.UF == UnidadeFederacaoSigla.PR && fornecedor.DataNascimento.Value.AddYears(18) >= DateTime.Now)
                    {
                        return mensagem = "Fornecedor não pode ser cadastrado por ser menor de idade";
                    }
                    if (!validaCPF)
                    {
                        return mensagem = "CPF Inválido";
                    }
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
            return mensagem;
        }

    }
}

