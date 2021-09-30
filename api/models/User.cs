using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using novo.dto;

namespace novo.models
{
    public class User
    {
        public User()
        { }

        public User(UserDto dto)
        {
            UniqueBirthNumber = dto.UniqueBirthNumber;
            IdCardNumber = dto.IdCardNumber;
            City = dto.City;
            Street = dto.Street;
            StreetNumber = dto.StreetNumber;
            Name = dto.Name;
            Surname = dto.Surname;
        }

        [Key]
        public string UniqueBirthNumber { get; set; }
        public string IdCardNumber { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}