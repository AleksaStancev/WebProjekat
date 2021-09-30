using System;
using System.ComponentModel.DataAnnotations;

namespace novo.models
{
    public class Policy
    {
        [Key]
        public string PolicyNumber { get; set; }
        public DateTime SigningDate { get; set; }
        public int Price { get; set; }
        public DateTime ValidUntill { get; set; }
        public string VehicleBodyId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}