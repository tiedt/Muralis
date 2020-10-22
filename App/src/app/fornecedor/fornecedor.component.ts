import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../_modules/Empresa';
import { Fornecedor } from '../_modules/Fornecedor';
import { EmpresaService } from '../_services/empresa.service';
import { FornecedorService } from '../_services/fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores: Fornecedor[];
  empresas: Empresa[];
  fornecedor: Fornecedor;
  fornecedoresFiltrados: Fornecedor[];
  _filtroLista = '';
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarFornecedor = '';
  titulo = 'Fornecedores';
  id: number;
  dataEvento: string;
  dataAtual: string;


  constructor(private fornecedorService: FornecedorService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService) {
    this.localeService.use('pt-br');
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.fornecedoresFiltrados = this.filtroLista ? this.filtrarFornecedor(this.filtroLista) : this.fornecedores;
  }

  ngOnInit() {
    this.validation();
    this.getFornecedores();
    this.getEmpresas();
  }

  filtrarFornecedor(filtrarPor: string): Fornecedor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.fornecedores.filter(
      fornecedor => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || fornecedor.cpfcnpj.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || fornecedor.dataCadastro.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  excluirFornecedor(fornecedor: Fornecedor, template: any) {
    this.openModal(template);
    this.fornecedor = fornecedor;
    this.bodyDeletarFornecedor = `Tem certeza que deseja excluir o Fornecedor: ${fornecedor.nome}, Código: ${fornecedor.id}`;
  }
  confirmeDelete(template: any) {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id).subscribe(
      () => {
        template.hide();
        this.getFornecedores();
        this.toastr.success('Deletado com Sucesso!');
      }, error => {
        this.toastr.error('Erro ao Tentar deletar!');
      }
    );
  }
  validation() {
    this.registerForm = this.fb.group({
      nomeFantasia: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      uf: ['', Validators.required],
    });
  }
  getFornecedores() {
    this.fornecedorService.obterFornecedor().subscribe(
      (_fornecedores: Fornecedor[]) => {
        this.fornecedores = _fornecedores;
        this.fornecedoresFiltrados = this.fornecedores;
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar Fornecedors: ${error}`);
      });
  }
  getEmpresas() {
    this.empresaService.obterEmpresa().subscribe(
      (_empresas: Empresa[]) => {
        this.empresas = _empresas;
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar Empresas: ${error}`);
      });
  }
  obterTipoEstado(uf: string): string {
    switch (uf.toString()) {
      case '1': return 'Acre';
      case '2': return 'Alagoas';
      case '3': return 'Amapá';
      case '4': return 'Amazonas';
      case '5': return 'Bahia';
      case '6': return 'Ceará';
      case '7': return 'Distrito Federal';
      case '8': return 'Espírito Santo';
      case '9': return 'Goiás';
      case '10': return 'Maranhão';
      case '11': return 'Mato Grosso';
      case '12': return 'Mato Grosso do Sul';
      case '13': return 'Minas Gerais';
      case '14': return 'Pará';
      case '15': return 'Paraíba';
      case '16': return 'Paraná';
      case '17': return 'Pernambuco';
      case '18': return 'Piauí';
      case '19': return 'Rio de Janeiro';
      case '20': return 'Rio Grande do Norte';
      case '21': return 'Rio Grande do Sul';
      case '22': return 'Rondônia';
      case '23': return 'Roraima';
      case '24': return 'Santa Catarina';
      case '25': return 'São Paulo';
      case '26': return 'Sergipe';
      case '27': return 'Tocantins';
      case '28': return 'Extrangeiro';
    }
  }
}


