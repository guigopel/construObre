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

  public gravarComentario(comentario: any): Observable<any> {
    return this.post("/comentarios", comentario);
  }

  public gravarAvaliacao(avaliacao: any): Observable<any> {
    return this.post("/avaliacoes", avaliacao);
  }

  public gravarCliente(cliente: any): Observable<any> {
    return this.post("/clientes", cliente);
  }

  public getClientes(): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/tipoProfissional", parametros);
  }

  public getProfissional(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/clientes/" + clienteId, parametros);
  }

  public getUsuario(usuarioId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/usuarios/" + usuarioId, parametros);
  }

  public getComentarioByClienteId(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/comentarios/cliente/" + clienteId, parametros);
  }

  public getProdutoByClinteId(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/produtos/imagens/loja/" + clienteId, parametros);
  }

  public getAvaliacaoByClienteId(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/avaliacoes/cliente/" + clienteId, parametros);
  }
  public getProjetos(): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/projetos", parametros);
  }

  public getProjetoByClienteId(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/projetos/cliente/" + clienteId, parametros);
  }

  public getProjetoComImagem(clienteId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/projetos/imagem/" + clienteId, parametros);
  }

  public getProjetoByProjetoId(projetoId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/projetos/" + projetoId, parametros);
  }

  public getImagensByProjetoId(projetoId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/imagens/profissional/" + projetoId, parametros);
  }

  public getItensProjeto(projetoId): Observable<any> {
    let parametros = new HttpParams();
    return this.getGeneric("/imagens/projeto/" + projetoId, parametros);
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

  public gravarAcesso(acesso: any): Observable<any> {
    return this.post("/acessos", acesso);
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

  protected put(controllerUrl: string, obj: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    let parametros = new HttpParams();
    return this.http.put(this.backOnline + controllerUrl, obj, { headers: headers, params: parametros, reportProgress: true });
  }

  public editarProduto(produto: any): Observable<any> {
    return this.put("/produtos/" + produto.produtoId, produto);
  }

  public editarProjeto(projeto: any): Observable<any> {
    return this.put("/projetos/" + projeto.projetoId, projeto);
  }

  public addQtdAcesso(acesso: any): Observable<any> {
    return this.put("/acessos/" + acesso.acessoId, acesso);
  }

  public editarImagem(imagem: any): Observable<any> {
    return this.put("/imagens/" + imagem.imagemId, imagem);
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
