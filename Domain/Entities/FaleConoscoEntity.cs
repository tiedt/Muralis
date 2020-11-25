using System;
namespace Domain.Entities
{
   public class FaleConoscoEntity : BaseEntity
    {
        public string Email { get; set; }

        public string Telefone { get; set; }
        public string Mensagem { get; set; }

        public DateTime DataEnvio { get; set; }
    }
}
