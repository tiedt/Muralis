import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../_modules/Fornecedor';


@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    constructor(private http: HttpClient) { }

    adicionarFornecedor(model: Fornecedor): Observable<any> {
        return this.http.post(`https://localhost:44392/Fornecedor`, model);
    }
    editarFornecedor(model: Fornecedor): Observable<any> {
        return this.http.put(`https://localhost:44392/Fornecedor`, model);
    }
    excluirFornecedor(idFornecedor: number): Observable<any> {
        return this.http.delete(`https://localhost:44392/Fornecedor/${idFornecedor}`);
    }
    obterFornecedorPorId(idFornecedor: number): Observable<any> {
        return this.http.get(`https://localhost:44392/Fornecedor/ObterFornecedorPorId?FornecedorId=${idFornecedor}`);
    }
    obterFornecedor(): Observable<any> {
        return this.http.get(`https://localhost:44392/Fornecedor`);
    }

}
