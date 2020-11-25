using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class FaleConoscoModel : BaseModel
    {
        [Required]
        [EmailAddress]
        [MinLength(5, ErrorMessage = "E-mail deve conter no mínimo 5 caracteres")]
        public string Email { get; set; }

        [Required]
        public string Telefone { get; set; }
        [Required]
        public string Mensagem { get; set; }
 
        public DateTime DataEnvio { get; set; }
    }
}
