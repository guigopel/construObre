import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ConexaoService {

  cryptoJS = require("crypto-js");
  private backOnline: string = "http://construobre.pythonanywhere.com";
  private backLocal: string = "http://127.0.0.1:5000"

  constructor(public dialog: MatDialog, public http: HttpClient) { }

  protected post(controllerUrl: string, obj: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    let parametros = new HttpParams();
    return this.http.post(this.backOnline + controllerUrl, obj, { headers: headers, params: parametros, reportProgress: true });
  }

  protected put(controllerUrl: string, obj: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    let parametros = new HttpParams();
    return this.http.put(this.backOnline + controllerUrl, obj, { headers: headers, params: parametros, reportProgress: true });
  }

  public getGeneric(controllerUrl: string, parametros: HttpParams): Observable<any> {
    return this.http.get(this.backOnline + controllerUrl, { params: parametros });
  }

  public getGenericPesquisa(controllerUrl: string, txtPesquisa: string): Observable<any> {
    return this.http.get(this.backOnline + controllerUrl + txtPesquisa);
  }

  public criptParam(param, name) {
    let encrypted = this.cryptoJS.AES.encrypt(param.toString(), "fawei%@#4635");
    sessionStorage.setItem(name, encrypted);
  }

  public decriptParam(param) {
    var decrypted = this.cryptoJS.AES.decrypt(sessionStorage.getItem(param), "fawei%@#4635");
    let stringDecript = decrypted.toString(this.cryptoJS.enc.Utf8)
    return stringDecript;
  }

  public gravarUsuario(usuario: any): Observable<any> {
    return this.post("/usuarios", usuario);
  }

  public gravarProduto(produto: any): Observable<any> {
    return this.post("/produtos", produto);
  }

  public editarProduto(produto: any): Observable<any> {
    return this.put("/produtos/" + produto.produtoId, produto);
  }

  public gravarCliente(cliente: any): Observable<any> {
    return this.post("/clientes", cliente);
  }

  public getClientes(): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/tipoProfissional", parametros);
  }

  public getLojas(): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/tipoLoja", parametros);
  }

  public getPesquisaClientes(txtPesquisa: string): Observable<any> {
    return this.getGenericPesquisa("/clientes/pesq/", txtPesquisa);
  }

  public getProdutosCliente(cliente_id: string): Observable<any> {
    return this.getGenericPesquisa("/produtos/cliente/", cliente_id);
  }

  public getProdutos(): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/produtos/imagens", parametros);
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log('headers', headers);
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
