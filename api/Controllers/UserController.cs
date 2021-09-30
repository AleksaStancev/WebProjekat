using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using novo.dto;
using novo.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace novo.Controllers
{
    [ApiController]
    [Route("Users")]
    public class UserController : ControllerBase
    {
        private readonly InsuranceDbContext _insuranceDbContext;

        public UserController(InsuranceDbContext insuranceDbContext)
        {
            _insuranceDbContext = insuranceDbContext;
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userToCreate)
        {
            var existingUser = await _insuranceDbContext.Set<User>().FindAsync(userToCreate.UniqueBirthNumber);
            if (existingUser is null)
            {
                var userModel = new User(userToCreate);
                await _insuranceDbContext.Set<User>().AddAsync(userModel);
                await _insuranceDbContext.SaveChangesAsync();
                return Ok();
            }
            else
                return BadRequest();
        }
        [HttpGet]
        [Route("GetAllUniqueBirthNumbers")]
        public async Task<ActionResult<ICollection<string>>> GetAllUniqueBirthNumbers()
        {
            var UniqueBirthNumberList = new List<string>();
            var list = await _insuranceDbContext.Set<User>().ToListAsync();
            foreach (var item in list)
            {
                UniqueBirthNumberList.Add(item.UniqueBirthNumber);
            }

            return Ok(UniqueBirthNumberList);
        }
        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
        {
            var existingUser = await _insuranceDbContext.Set<User>().FindAsync(userDto.UniqueBirthNumber);
            if (existingUser is not null)
            {
                existingUser.Name = userDto.Name;
                existingUser.Surname = userDto.Surname;
                existingUser.City = userDto.City;
                existingUser.Street = userDto.Street;
                existingUser.StreetNumber = userDto.StreetNumber;
                existingUser.IdCardNumber = userDto.IdCardNumber;
            
                _insuranceDbContext.Set<User>().Update(existingUser);
                await _insuranceDbContext.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("GetUserById")]
        public async Task<ActionResult<User>> GetUserById([FromQuery] string UniqueBirthNumber)
        {
            var user = await _insuranceDbContext.Set<User>().FindAsync(UniqueBirthNumber);
            if (user is null) return BadRequest();
            return Ok(user);
        }
        [HttpDelete]
        [Route("DeleteUserById")]
        public async Task<IActionResult> DeleteUserById([FromQuery] string UniqueBirthNumber)
        {
            var user = await _insuranceDbContext.Set<User>().FindAsync(UniqueBirthNumber);
            if (user is null) return BadRequest();
            _insuranceDbContext.Set<User>().Remove(user);
            await _insuranceDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}