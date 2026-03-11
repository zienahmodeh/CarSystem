using Domain.Interfaces;
using DTO;
using SharedKernel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Net.Http;

namespace Domain.Service;

public class CarService(IHttpClientFactory httpClientFactory) : ICarService
{
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;

    public async Task<ServiceOperationResult<List<MakeDTO>>> GetAllMakes()
    {
        var response = new ServiceOperationResult<List<MakeDTO>>();
        try
        {
            var client = _httpClientFactory.CreateClient("NhtsaClient");
            var nhtsaData = await client.GetFromJsonAsync<NhtsaResponse<MakeDTO>>("getallmakes?format=json");

            response.Result = nhtsaData?.Results ?? [];
        }
        catch (Exception)
        {
            response.IsSuccessfull = false;
            response.ErrorCodes.Add(Errors.GeneralError);
        }
        return response;
    }

    public async Task<ServiceOperationResult<List<ModelDTO>>> GetVehicleTypesByMakeId(int makeId)
    {
        var response = new ServiceOperationResult<List<ModelDTO>>();
        try
        {
            var client = _httpClientFactory.CreateClient("NhtsaClient");
            var nhtsaData = await client.GetFromJsonAsync<NhtsaResponse<ModelDTO>>($"GetModelsForMakeId/{makeId}?format=json");

            response.Result = nhtsaData?.Results ?? new List<ModelDTO>();
        }
        catch (Exception)
        {
            response.IsSuccessfull = false;
            response.ErrorCodes.Add(Errors.GeneralError);
        }
        return response;
    }
    public async Task<ServiceOperationResult<List<ModelByYearDTO>>> GetModelsByFilter(VehicleFilterDTO filter)
    {
        var response = new ServiceOperationResult<List<ModelByYearDTO>>();
        try
        {
            var client = _httpClientFactory.CreateClient("NhtsaClient");

            string url = $"GetModelsForMakeIdYear/makeId/{filter.MakeId}/modelyear/{filter.Year}";

            if (!string.IsNullOrEmpty(filter.VehicleType))
            {
                url += $"/vehicleType/{filter.VehicleType}";
            }

            url += "?format=json";

            var nhtsaData = await client.GetFromJsonAsync<NhtsaResponse<ModelByYearDTO>>(url);
            response.Result = nhtsaData?.Results ?? new List<ModelByYearDTO>();
            response.IsSuccessfull = true; 
        }
        catch (Exception ex)
        {
            response.IsSuccessfull = false;
            response.ErrorCodes.Add(Errors.GeneralError);
        }
        return response;
    }
}
