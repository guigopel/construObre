import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, throwError as observableThrowError } from 'rxjs';
// import 'rxjs/add/operator/timeoutWith';
import { map, filter, switchMap } from 'rxjs/operators'
// import 'rxjs/Rx';

import { ConexaoLista } from '../model/ConexaoLista';


@Injectable({
  providedIn: 'root',
})
export class ConexaoService {


  private backOnline: string = "http://construobre.pythonanywhere.com";
  private backLocal: string = "http://127.0.0.1:5000"

  constructor(public dialog: MatDialog, public http: HttpClient) { }


  protected post(controllerUrl: string, obj: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    let parametros = new HttpParams();
    console.log('backLocal', this.backLocal);
    return this.http.post(this.backOnline + controllerUrl, obj, { headers: headers, params: parametros, reportProgress: true });
  }

    public getGeneric(controllerUrl: string, parametros: HttpParams): Observable<any> {
      return this.http.get(this.backOnline + controllerUrl, { params: parametros });
    }

    public getGenericPesquisa(controllerUrl: string, txtPesquisa: string): Observable<any> {
      return this.http.get(this.backOnline + controllerUrl + txtPesquisa);
    }

  public gravarUsuario(usuario: any): Observable<any> {
    return this.post("/usuarios", usuario);
  }

  public gravarCliente(cliente: any): Observable<any> {
    return this.post("/clientes", cliente);
  }

  public getClientes(): Observable<any> {
    let parametros = new HttpParams();
    // parametros = parametros.append("subdominio", subdominio);
    return this.getGeneric("/clientes", parametros);
  }

  public getPesquisaClientes(txtPesquisa: string): Observable<any> {
    return this.getGenericPesquisa("/clientes/pesq/", txtPesquisa);
  }

  public gravarImagem(imagem: any): Observable<any> {
    return this.post("/imagens", imagem);
  }

  public gravarProjeto(projeto: any): Observable<any> {
    return this.post("/projetos", projeto);
  }

  public gravarLogin(login: any): Observable<any> {
    return this.post("/logins", login);
  }

  public realizarLogin(login: any): Observable<any> {
    return this.post("/login", login);
  }


  public logout(auth_token): Observable<any> {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log('headers',headers);
    return this.http.get(this.backOnline + "/logout", { headers: headers })
  }


  private handleError(error: any) {
    // this.overlayService.esconde();
    // var errorString: string = `Erro encontrado ao conectar-se com o servidor`;
    // if (error.status != 200) {
    //   if (error.status != 0) {
    //     var index1 = error.error.indexOf('<h1>');
    //     var index2 = error.error.indexOf('</h1>');
    //     errorString += `:\n ${error.error.substring(index1 + 4, index2)}`;
    //   }
    /* this.elevaAlertDialogRef = this.dialog.open(AlertComponent, {
       data: {
         titulo: `Erro ${error.status}`,
         mensagem: errorString,
         tema: "erro",
         textoBotaoConfirma: "OK"
       }
     });*/
    // 400 erro de logica

    // if (error.status == 500) {
    //   this.elevaAlertDialogRef = this.dialog.open(AlertComponent, {
    //     data: {
    //       titulo: `Verifique sua conexão de internet :(`,
    //       mensagem: ``,
    //       tema: "erro",
    //       textoBotaoConfirma: "OK"
    //     }
    //   });
    // }
    // else{
    //   this.elevaAlertDialogRef = this.dialog.open(AlertComponent, {
    //     data: {
    //       titulo: `Erro ${error.status}`,
    //       mensagem: errorString,
    //       tema: "erro",
    //       textoBotaoConfirma: "OK"
    //     }
    //   });
    // }
    // return observableThrowError(error);
  }

}
