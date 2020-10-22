using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class FornecedorEntity : BaseEntity
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "O nome do fornecedor é obrigatório.")]
        public string Nome { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "O CPF/CNPJ é obrigatório.")]
        public string CPFCNPJ { get; set; }

        public string? RG { get; set; }
        public DateTime? DataNascimento { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "A Data de Cadastro é obrigatória.")]
        public DateTime DataCadastro { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "A Empresa é obrigatória.")]
        public int EmpresaId { get; set; }

        public TipoFornecedor TipoFornecedor { get; set; }

        public EmpresaEntity Empresa { get; set; }

        public List<TelefoneFornecedorEntity> TelefoneFornecedor { get; set; }
    }

    #region TipoFornecedor
   public enum TipoFornecedor
    {
        [Description("Físico")]
        Fisico = 1,
        [Description("Jurídico")]
        Juridico,

    }
    #endregion
}
