using Domain.Interfaces;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase 
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("makes")]
        public async Task<IActionResult> GetMakes()
        {
            var result = await _carService.GetAllMakes();
            return Ok(result);
        }

        [HttpGet("types/{makeId}")]
        public async Task<IActionResult> GetVehicleTypes(int makeId)
        {
            var result = await _carService.GetVehicleTypesByMakeId(makeId);
            return Ok(result);
        }

        [HttpGet("models")]
        public async Task<IActionResult> GetModels([FromQuery] VehicleFilterDTO filter)
        {
            var result = await _carService.GetModelsByFilter(filter);
            return Ok(result);
        }
    }
}