using Domain.Entities;
using Domain.Implementations;
using Domain.Interfaces.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Application.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        protected readonly IEmpresaRepository _service;
        EmpresaValidation empresaValidation = new EmpresaValidation();

        public EmpresaController(IEmpresaRepository service)
        {
            _service = service;
        }

        [HttpGet("GetAllEmpresas")]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var obterTodos = await _service.ObterTodosAsync();
                return Ok(obterTodos);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }
        [HttpGet("EmpresaId")]
        public async Task<IActionResult> Get(int EmpresaId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var obterPorId = await _service.ObterPorIdAsync(EmpresaId);
                return Ok(obterPorId);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> Post(EmpresaEntity model)
        {
            
            try
            {
                var validaDadosEmpresa = empresaValidation.ValidarDadosEmpresa(model);
                if (validaDadosEmpresa.Any())
                    throw new ArgumentException(validaDadosEmpresa);
                else
                    return Ok(_service.InsertAsync(model));

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(EmpresaEntity model)
        {
            try
            {
                var validaDadosEmpresa = empresaValidation.ValidarDadosEmpresa(model);
                if (validaDadosEmpresa.Any())
                    throw new ArgumentException(validaDadosEmpresa);
                else
                    return Ok(_service.UpdateAsync(model));
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{EmpresaId}")]
        public async Task<IActionResult> Delete(int EmpresaId)
        {
            try
            {
                var empresa = await _service.GetByIdAsync(EmpresaId);
                if (empresa == null) return NotFound();

                return Ok(_service.DeleteByIdAsync(empresa.Id));
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}