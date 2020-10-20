import { Component, OnInit, EventEmitter, ModuleWithComponentFactories } from '@angular/core';
import { AutoSaveFormGroup } from 'src/shared/base/auto-save-form-group';
import { FormControl, FormGroup } from '@angular/forms';
import { FornecedorModel } from 'src/app/models/fornecedorModel';
import { EmpresaModel } from 'src/app/models/empresaModel';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServicesMessages } from 'src/app/services/service-mensagem';
import { BaseCadastroComponent } from 'src/shared/base/base-component';
import * as moment from 'moment'

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent extends BaseCadastroComponent implements OnInit {
  public fornecedorModel: FornecedorModel;
  public submited: boolean;
  public display: boolean;
  public listaDeEmpresas: any;
  public dateBday: Date;
  public loading = false;
  public idFornecedor: number;
  public indiceEmpresa: number;
  public onClose = new EventEmitter<any>();
  public onSalvar = new EventEmitter<any>();

  constructor(private service: FornecedorService,
    private serviceEmpresa: EmpresaService,
    private servicesMessages: ServicesMessages) {
    super();
    this.criarFormulario();
  }

  ngOnInit() {
    this.service.obterFornecedor()
      .finally(() => this.loading = false)
      .subscribe(response => this.data = response,
        error => this.servicesMessages.handleError(error));
        this.carregarModel();
  }

  obterEmpresa() {
    this.serviceEmpresa.obterEmpresa().subscribe(
      reponse => this.listaDeEmpresas = reponse);
  }

  criarFormulario() {
    this.form = new AutoSaveFormGroup({
      nome: new FormControl(),
      cpfcnpj: new FormControl(),
      telefone: new FormControl(),
      tipoFornecedor: new FormControl(-1),
      rg: new FormControl(),
      dataNascimento: new FormControl(),
      idEmpresa: new FormControl()
    });
  }
  novo() {
    this.display = true;
    this.idFornecedor = undefined;
    this.criarFormulario();
    this.obterEmpresa();
  }
  carregarModel() {
    if (this.idFornecedor) {
      this.service.obterFornecedorPorId(this.idFornecedor)
        .subscribe(response => {
          this.fornecedorModel = new FornecedorModel();
          this.fornecedorModel.nome = response.nome;
          this.fornecedorModel.cpfcnpj = response.cpfcnpj;
          this.fornecedorModel.telefone = response.telefone;
          this.fornecedorModel.rg = response.rg;
          this.fornecedorModel.tipoFornecedor = response.tipoFornecedor;
          this.fornecedorModel.dataNascimento = response.dataNascimento;
          this.form.patchValue(this.fornecedorModel);
        });
    } else {
      this.criarFormulario();
    }
  }

  editar(idFornecedor: any) {
    this.display = true;
    this.idFornecedor = idFornecedor;
    this.obterEmpresa();
    this.service.obterFornecedorPorId(idFornecedor)
      .subscribe(response => {
        this.fornecedorModel = new FornecedorModel();
        this.fornecedorModel.nome = response.nome;
        this.fornecedorModel.cpfcnpj = response.cpfcnpj;
        this.fornecedorModel.telefone = response.telefone;
        this.fornecedorModel.rg = response.rg;
        this.fornecedorModel.idEmpresa = response.idEmpresa;
        this.fornecedorModel.dataNascimento = this.obterDataCadastro(response.dataNascimento);
        this.fornecedorModel.tipoFornecedor = response.tipoFornecedor;
        this.form.patchValue(this.fornecedorModel);
      });

  }

  remover(idFornecedor: any) {
    this.service.excluirFornecedor(idFornecedor)
      .finally(() => this.ngOnInit())
      .subscribe(item => { });
    this.servicesMessages.notification.exibirMensagemDeSucesso('O Fornecedor foi Removido com Sucesso');
  }

  salvar() {
    this.submited = true;

    const empresa = this.form.get('idEmpresa').value;
    if (empresa === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O Fornecedor não foi informado');
      return;
    }
    const nome = this.form.get('nome').value;
    if (nome === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O Nome não foi informado');
      return;
    }
    const cpfcnpj = this.form.get('cpfcnpj').value;
    if (cpfcnpj === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O CPF/CNPJ não foi informado');
      return;
    }
    const tipoFornecedor = this.form.get('tipoFornecedor').value;
    if (tipoFornecedor === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O Tipo de Fornecedor não foi informado');
      return;
    }
    const tipoPessoa = this.obterTipoPessoa();
    if (tipoPessoa === 1) {
      const rg = this.form.get('rg').value;
      if (rg === null) {
        this.servicesMessages.notification.exibirMensagemDeErro('O RG não foi informado');
        return;
      }
      const dataNascimento = this.form.get('dataNascimento').value;
      if (dataNascimento === null) {
        this.servicesMessages.notification.exibirMensagemDeErro('O Data de Nascimento não foi informado');
        return;
      }
    }

    if (this.form.valid) {
      this.fornecedorModel = new FornecedorModel();
      this.fornecedorModel.idFornecedor = this.idFornecedor;
      this.fornecedorModel.nome = this.form.get('nome').value;
      this.fornecedorModel.cpfcnpj = this.form.get('cpfcnpj').value;
      this.fornecedorModel.telefone = this.form.get('telefone').value;
      this.fornecedorModel.idEmpresa = this.form.get('idEmpresa').value;
      this.fornecedorModel.tipoFornecedor = this.form.get('tipoFornecedor').value;
      if (tipoPessoa === 1) {
        this.fornecedorModel.rg = this.form.get('rg').value;
        this.fornecedorModel.dataNascimento = this.formatDate(this.form.get('dataNascimento').value);
      } else {
        this.fornecedorModel.rg = 'Pessoa Jurídica';
      }

      if (this.idFornecedor) {
        this.fornecedorModel.idFornecedor = this.idFornecedor;
        this.service.editarFornecedor(this.fornecedorModel)
          .finally(() => this.loading = false)
          .subscribe(response => this.aposSalvar(response),
            error => this.servicesMessages.handleError(error));
      } else {
        this.service.adicionarFornecedor(this.fornecedorModel)
          .finally(() => this.loading = false)
          .subscribe(response => this.aposSalvar(response),
            error => this.servicesMessages.handleError(error));
      }
    }
  }
  aposSalvar(response: any) {
    this.servicesMessages.notification.exibirMensagemDeSucesso('Fornecedor Cadastrado com Sucesso');
    this.display = false;
    this.ngOnInit();
  }
  close() {
    this.display = false;
    this.listaDeEmpresas = null;
    this.fornecedorModel.tipoFornecedor = null;
  }
  obterTipoPessoa(): number {
    const value = this.form.get('tipoFornecedor').value;
    if (value === undefined || value === null || value.toString().trim() === '') {
      return -1;
    }

    return Number.parseInt(value.toString().trim());
  }
  obterDataCadastro(date: any): any {
    if (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
