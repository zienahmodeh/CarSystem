using DTO;
using SharedKernel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces;

public interface ICarService
{
    Task<ServiceOperationResult<List<MakeDTO>>> GetAllMakes();
    Task<ServiceOperationResult<List<ModelDTO>>> GetModelsByMakeId(int makeId);
}
