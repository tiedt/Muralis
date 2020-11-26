using Domain.Model;

namespace Domain.Entities
{
   public class ProdutoEntity
    {
        public string NomeProduto { get; set; }
        public string Descricao { get; set; }

        public TipoProdutoEnum TipoProduto { get; set; }
    }
}
