using Domain.Entities;
using static Domain.Shared.Validacao;

namespace Domain.Implementations
{
    public class Empresa
    {
        public Empresa()
        {
        }

        public string ValidarDadosEmpresa(EmpresaEntity model)
        {
            var mensagem = "";
            var validaCNPJ = ValidaCNPJ.IsCnpj(model.CNPJ);
            if (!validaCNPJ)
            {
                mensagem = "CNPJ não é válido";
            }
            return mensagem;
        }
    }
}
