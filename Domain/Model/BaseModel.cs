using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class BaseModel
    {
        [Key]
        public long Id { get; set; }
    }
}
