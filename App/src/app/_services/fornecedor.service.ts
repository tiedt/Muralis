import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../_modules/Fornecedor';


@Injectable({
    providedIn: 'root'
})
export class FornecedorService {
    baseUrl = "https://localhost:5001/Empresa";
    constructor(private http: HttpClient) { }

    adicionarFornecedor(model: Fornecedor): Observable<any> {
        return this.http.post(`${this.baseUrl}`, model);
    }
    editarFornecedor(model: Fornecedor): Observable<any> {
        return this.http.put(`${this.baseUrl}`, model);
    }
    excluirFornecedor(idFornecedor: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${idFornecedor}`);
    }
    obterFornecedorPorId(idFornecedor: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/ObterFornecedorPorId?FornecedorId=${idFornecedor}`);
    }
    obterFornecedor(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

}
