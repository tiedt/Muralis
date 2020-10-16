using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Implementations.Validations;
using Domain.Interfaces.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        protected readonly IFornecedorRepository _service;
        protected readonly IEmpresaRepository _empresa;

        public FornecedorController(IFornecedorRepository service,IEmpresaRepository empresa)
        {
            _service = service;
            _empresa = empresa;
        }

        [HttpGet]
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
        public async Task<IActionResult> Post(FornecedorEntity model)
        {
            var empresa = new FornecedorValidation();
            try
            {
                var obtemEmpresa = await _empresa.ObterPorIdAsync(model.EmpresaId);
                var valida = await empresa.ValidaFornecedor(model, obtemEmpresa);
                if (valida.Any())
                    throw new Exception(valida);
                else
                    return Ok(_service.InsertAsync(model));

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(FornecedorEntity model)
        {
            try
            {
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