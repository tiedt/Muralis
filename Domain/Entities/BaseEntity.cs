﻿using System.ComponentModel.DataAnnotations;
namespace Domain.Entities
{
    public class BaseEntity
    {
        [Key]
        public long Id { get; set; }
    }
}
