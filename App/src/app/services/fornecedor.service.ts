import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FornecedorModel } from '../models/fornecedorModel';


@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    constructor(private http: HttpClient) { }

    adicionarFornecedor(model: FornecedorModel): Observable<any> {
        return this.http.post(`http://localhost:5007/v1/fornecedor`, model);
    }
    editarFornecedor(model: FornecedorModel): Observable<any> {
        return this.http.put(`http://localhost:5007/v1/fornecedor`, model);
    }
    excluirFornecedor(idFornecedor: number): Observable<any> {
        return this.http.delete(`http://localhost:5007/v1/fornecedor?id=${idFornecedor}`);
    }
    obterFornecedorPorId(idFornecedor: number): Observable<any> {
        return this.http.get(`http://localhost:5007/v1/fornecedor/por-id/${idFornecedor}`);
    }
    obterFornecedor(): Observable<any> {
        return this.http.get(`http://localhost:5007/v1/fornecedor/todos`);
    }

}
