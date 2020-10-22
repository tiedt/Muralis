import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/_modules/Empresa';
import { Fornecedor } from 'src/app/_modules/Fornecedor';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { defineLocale, ptBrLocale } from "ngx-bootstrap/chronos";
import { async } from '@angular/core/testing';
defineLocale("pt-br", ptBrLocale);
@Component({
  selector: 'app-fornecedor-edit',
  templateUrl: './fornecedor-edit.component.html',
  styleUrls: ['./fornecedor-edit.component.css']
})
export class FornecedorEditComponent implements OnInit {
  titulo = 'Fornecedor';
  fornecedor: Fornecedor = new Fornecedor();
  listaEmpresas: Empresa[];
  registerForm: FormGroup;
  verificaSeEhAlteracao = this.activateRouter.snapshot.params.id;
  modoSalvar = 'post';
  id: number;

  constructor(
    private fornecedorService: FornecedorService,
    private empresaService: EmpresaService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    , private activateRouter: ActivatedRoute
    , private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.validation();
    this.getEmpresas();
    this.carregarFornecedor();
  }

  get telefoneFornecedor(): FormArray {
    return <FormArray>this.registerForm.get('telefoneFornecedor');
  }

  carregarFornecedor() {
    if (this.verificaSeEhAlteracao != null) {
      this.modoSalvar = 'put';
      this.id = +this.activateRouter.snapshot.paramMap.get('id');
      this.fornecedor.id = this.id;
      this.fornecedorService.obterFornecedorPorId(this.fornecedor.id)
        .subscribe(
          (fornecedor: Fornecedor) => {
            this.fornecedor = Object.assign({}, fornecedor);
            this.registerForm.patchValue(this.fornecedor);
            console.log(this.fornecedor);

            this.fornecedor.telefoneFornecedor.forEach(telefone => {
              this.telefoneFornecedor.push(this.criarTelefone(telefone));
            });
          }
        );
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      empresaId: [],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      cpfcnpj: [''],
      rg: [''],
      tipoFornecedor: ['', Validators.required],
      dataNascimento: ['',],
      telefoneFornecedor: this.fb.array([])
    });
  }

  criarTelefone(telefone: any): FormGroup {
    return this.fb.group({
      id: [telefone.id],
      numeroTelefone: [telefone.numeroTelefone, Validators.required]
    });
  }

  adicionarTelefone() {
    this.telefoneFornecedor.push(this.criarTelefone({ id: 0 }));
  }

  removerTelefone(id: number) {
    this.telefoneFornecedor.removeAt(id);
  }

  obterTipoFornecedor(): number {
    const value = this.registerForm.get('tipoFornecedor').value;
    if (value === undefined || value === null || value.toString().trim() === '') {
      return -1;
    }
    if (value === "2") {
      this.registerForm.get("rg").setValue("");
      this.registerForm.get("dataNascimento").setValue("");
    }
    return Number.parseInt(value.toString().trim());
  }

  salvarFornecedor() {
    this.fornecedor = Object.assign(this.registerForm.value);
    if (this.fornecedor.tipoFornecedor == 1 && (this.fornecedor.cpfcnpj.length < 11 || !this.fornecedor.cpfcnpj)) {
      return this.toastr.error('Fornecedor não possui CPF cadastrado');
    }
    if (this.fornecedor.tipoFornecedor == 2 && (this.fornecedor.cpfcnpj.length < 14 || !this.fornecedor.cpfcnpj)) {
      return this.toastr.error('Fornecedor não possui CNPJ cadastrado');
    }
    if (this.fornecedor.tipoFornecedor == 1 && (!this.fornecedor.rg || !this.fornecedor.dataNascimento)) {
      return this.toastr.error('Dados estão incorretos');
    }

    if (this.modoSalvar == 'post') {
      this.fornecedorService.adicionarFornecedor(this.fornecedor).subscribe(
        () => {
          this.modoSalvar = 'put';
          this.toastr.success('Salvo com Sucesso!');
          this.toastr.success('Você irá ser redirecionado para a página de fornecedores');
          this.router.navigate(['/fornecedor']);
        }, error => {
          this.toastr.error(`Erro ao Salvar: ${error.error}`);
        }
      );
    } else {
      this.fornecedor = Object.assign({ id: this.id }, this.registerForm.value);
      this.fornecedorService.editarFornecedor(this.fornecedor).subscribe(
        () => {
          this.toastr.success('Editado com Sucesso!');
        }, error => {
          this.toastr.error(`Erro ao Editar: ${error.error}`);
        }
      );
    }
  }
  getEmpresas() {
    this.empresaService.obterEmpresa().subscribe(
      (_empresas: Empresa[]) => {
        this.listaEmpresas = _empresas;
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar Empresas: ${error}`);
      });
  }
}