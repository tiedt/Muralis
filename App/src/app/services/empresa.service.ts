import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EmpresaModel } from '../models/empresaModel';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

    constructor(private http: HttpClient) { }

    adicionarEmpresa(model: EmpresaModel): Observable<any> {
      return this.http.post(`http://localhost:5007/v1/empresa`, model);
    }
    editarEmpresa(model: EmpresaModel): Observable<any> {
      return this.http.put(`http://localhost:5007/v1/empresa`, model);
    }
    excluirEmpresa(idEmpresa: number): Observable<any> {
      return this.http.delete(`http://localhost:5007/v1/empresa?id=${idEmpresa}`);
    }
    obterEmpresaPorId(idEmpresa: number): Observable<any> {
      return this.http.get(`http://localhost:5007/v1/empresa/por-id/${idEmpresa}`);
    }
    obterEmpresa(): Observable<any> {
      return this.http.get(`http://localhost:5007/v1/empresa/todos`);
    }
}
