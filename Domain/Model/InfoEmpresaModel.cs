using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class InfoEmpresaModel
    {
        [Required]
        [MinLength(5, ErrorMessage = "Empresa deve conter no mínimo 5 caracteres")]
        public string NomeEmpresa { get; set; }
        public string CNPJ { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string CEP { get; set; }
        public string Rua { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }

    }
}
