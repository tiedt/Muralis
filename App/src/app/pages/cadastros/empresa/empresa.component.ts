import { Component, OnInit, EventEmitter } from '@angular/core';
import { BaseCadastroComponent } from 'src/shared/base/base-component';
import { EmpresaModel } from 'src/app/models/empresaModel';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServicesMessages } from 'src/app/services/service-mensagem';
import { AutoSaveFormGroup } from 'src/shared/base/auto-save-form-group';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends BaseCadastroComponent implements OnInit {
  public empresaModel: EmpresaModel;
  public submited: boolean;
  public display: boolean;
  public loading = false;
  public idEmpresa: number;
  public onClose = new EventEmitter<any>();
  public onSalvar = new EventEmitter<any>();

  constructor(private service: EmpresaService,
    private servicesMessages: ServicesMessages) {
    super();
    }

  ngOnInit() {
    this.service.obterEmpresa()
      .finally(() => this.loading = false)
      .subscribe(response => this.data = response,
        error => this.servicesMessages.handleError(error));
    this.carregarModel();
  }

  criarFormulario() {
    this.form = new AutoSaveFormGroup({
      nomeFantasia: new FormControl(),
      cnpj: new FormControl(),
      uf: new FormControl()
    });
  }
  novo() {
    this.display = true;
    this.idEmpresa = undefined;
    this.criarFormulario();
  }
  carregarModel() {
    if (this.idEmpresa) {
      this.service.obterEmpresaPorId(this.idEmpresa)
        .subscribe(response => {
          this.empresaModel = new EmpresaModel();
          this.empresaModel.nomeFantasia = response.nomeFantasia;
          this.empresaModel.cnpj = response.cnpj;
          this.empresaModel.uf = response.uf;
          this.form.patchValue(this.empresaModel);
        });
    } else {
      this.criarFormulario();
    }
  }

  editar(idEmpresa: any) {
    this.display = true;
    this.idEmpresa = idEmpresa;
    this.service.obterEmpresaPorId(idEmpresa)
      .subscribe(response => {
        this.empresaModel = new EmpresaModel();
          this.empresaModel.nomeFantasia = response.nomeFantasia;
          this.empresaModel.cnpj = response.cnpj;
          this.empresaModel.uf = response.uf;
        this.form.patchValue(this.empresaModel);
      });
  }

  remover(idEmpresa: any) {
    this.service.excluirEmpresa(idEmpresa)
      .finally(() => this.ngOnInit())
      .subscribe(item => { });
    this.servicesMessages.notification.exibirMensagemDeSucesso('A Empresa foi Removida com Sucesso');
  }

  salvar() {
    this.submited = true;
    const nomeFantasia = this.form.get('nomeFantasia').value;
    if (nomeFantasia === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O Nome Fantasia não foi informado');
      return;
    }
    const cnpj = this.form.get('cnpj').value;
    if (cnpj === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('O cnpj não foi informado');
      return;
    }
    const uf = this.form.get('uf').value;
    if (uf === null) {
      this.servicesMessages.notification.exibirMensagemDeErro('A uf não foi informado');
      return;
    }
    if (this.form.valid) {
      this.empresaModel = new EmpresaModel();
      this.empresaModel.idEmpresa = this.idEmpresa;
      this.empresaModel.nomeFantasia = this.form.get('nomeFantasia').value;
      this.empresaModel.cnpj = this.form.get('cnpj').value;
      this.empresaModel.uf = this.form.get('uf').value;

      if (this.idEmpresa) {
        this.empresaModel.idEmpresa = this.idEmpresa;
        this.service.editarEmpresa(this.empresaModel)
          .finally(() => this.loading = false)
          .subscribe(response => this.aposSalvar(response),
            error => this.servicesMessages.handleError(error));
      } else {
        this.service.adicionarEmpresa(this.empresaModel)
          .finally(() => this.loading = false)
          .subscribe(response => this.aposSalvar(response),
            error => this.servicesMessages.handleError(error));
      }
    }
  }
  aposSalvar(response: any) {
    this.servicesMessages.notification.exibirMensagemDeSucesso('Empresa Cadastrada com Sucesso');
    this.display = false;
    this.ngOnInit();
  }
  close() {
    this.display = false;
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
