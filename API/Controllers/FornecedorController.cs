using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Domain.Implementations.Validations;
using Domain.Interfaces.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        protected readonly IFornecedorRepository _service;
        protected readonly IEmpresaRepository _empresa;
        private readonly IMapper _mapper;
        FornecedorValidation fornecedorValidation = new FornecedorValidation();

        public FornecedorController(IFornecedorRepository service,IEmpresaRepository empresa, IMapper mapper)
        {
            _service = service;
            _empresa = empresa;
            _mapper = mapper;
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
                var obterTodos = await _service.GetFornecedorAsync();
                return Ok(obterTodos);
            }
            catch (ArgumentException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

        }
        [HttpGet("ObterFornecedorPorId")]
        public async Task<IActionResult> Get(int FornecedorId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var obterPorId = await _service.GetFornecedorAsyncById(FornecedorId);
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
            try
            {
                var fornecedor = _mapper.Map<FornecedorEntity>(model);
                var obtemEmpresa = await _empresa.ObterPorIdAsync(model.EmpresaId);
                var valida = await fornecedorValidation.ValidaFornecedor(fornecedor, obtemEmpresa);
                if (valida.Any())
                    throw new ArgumentException(valida);
                else
                    model.DataCadastro = DateTime.UtcNow;
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
                var fornecedor = await _service.GetFornecedorAsyncById(model.Id);
                if (fornecedor == null) return NotFound();

                var idTelefone = new List<int>();
                model.TelefoneFornecedor.ForEach(item => idTelefone.Add(item.Id));

                var telefones = fornecedor.TelefoneFornecedor.Where(telefones => !idTelefone.Contains(telefones.Id)).ToArray();

                if (telefones.Length > 0) _service.DeleteRange(telefones);

                _mapper.Map(model, fornecedor);

                var obtemEmpresa = await _empresa.ObterPorIdAsync(model.EmpresaId);
                var valida = await fornecedorValidation.ValidaFornecedor(model, obtemEmpresa);

                if (valida.Any())
                    throw new ArgumentException(valida);
                else
                    return Ok(_service.UpdateAsync(model));

            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{FornecedorId}")]
        public async Task<IActionResult> Delete(int FornecedorId)
        {
            try
            {
                var empresa = await _service.GetByIdAsync(FornecedorId);
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