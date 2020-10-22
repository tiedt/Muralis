import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../_modules/Empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

    constructor(private http: HttpClient) { }

    adicionarEmpresa(model: Empresa): Observable<any> {
      return this.http.post(`https://localhost:44392/Empresa`, model);
    }
    editarEmpresa(model: Empresa): Observable<any> {
      return this.http.put(`https://localhost:44392/Empresa`, model);
    }
    excluirEmpresa(idEmpresa: number): Observable<any> {
      return this.http.delete(`https://localhost:44392/Empresa/${idEmpresa}`);
    }
    obterEmpresaPorId(idEmpresa: any): Observable<any> {
      return this.http.get<Empresa[]>(`https://localhost:44392/Empresa/por-id/${idEmpresa}`);
    }
    obterEmpresa(): Observable<Empresa[]> {
      return this.http.get<Empresa[]>(`https://localhost:44392/Empresa/GetAllEmpresas`);
    }
}
