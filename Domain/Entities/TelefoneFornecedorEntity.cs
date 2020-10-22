using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
   public class TelefoneFornecedorEntity : BaseEntity
    {
        [Phone]
        public string NumeroTelefone { get; set; }

        public int FornecedorId { get; set; }
        public FornecedorEntity Fornecedor { get; set; }
    }
}
