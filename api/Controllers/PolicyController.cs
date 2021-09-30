
using Microsoft.AspNetCore.Mvc;

namespace novo.Controllers
{
    [ApiController]
    [Route("Policies")]
    public class PolicyController : ControllerBase
    {
        [HttpGet]
        [Route("GetById")]
        public void GetByID()
        {

        }
    }
}