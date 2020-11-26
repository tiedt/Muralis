namespace Domain.Model
{
    public class ProdutoModel : BaseModel
    {
        public string NomeProduto { get; set; }
        public string Descricao { get; set; }

        public TipoProdutoEnum TipoProduto { get; set; }
    }
    public enum TipoProdutoEnum
    {
        Masculino = 1,
        Feminino,
        Infantil,
        Plus
    }
}
