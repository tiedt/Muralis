import { TelefoneFornecedor } from './Telefone';

export class Fornecedor {
    public id: number;
    public nome: string;
    public cpfcnpj: string;
    public rg?: string;
    public dataNascimento: any;
    public dataCadastro: any;
    public empresaId?: number;
    public tipoFornecedor: number;
    public telefoneFornecedor: TelefoneFornecedor[];
}