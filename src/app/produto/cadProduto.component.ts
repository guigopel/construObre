import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-cadProduto',
  templateUrl: './cadProduto.component.html',
  styleUrls: ['./cadProduto.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadProdutoComponent implements OnInit {
  CryptoJS = require("crypto-js");
  permissao = 0;
  produtoId = 0;
  isEdit = false;
  produtos = [];
  private readonly notifier: NotifierService;

  mainForm: FormGroup;
  constructor(
    private conexaoService: ConexaoService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.preencheFormGroup();
    if(!sessionStorage.getItem("tipoPermissao")) {
      this.router.navigate(["home"]);
    }
    this.permissao = this.conexaoService.decriptParam("tipoPermissao");
    this.carregaProdutos();
    // console.log('this.permissao',this.permissao);
    // if(this.permissao != 2  ) {
    //   console.log('NÂO TEM PERMISSAO');
    //   this.router.navigate(["home"]);
    // }
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      produto: new FormControl(null),
      descricao: new FormControl(null),
      urlImagem: new FormControl(null),
      valor: new FormControl(null),
    });
  }

  carregaProdutos() {
    this.conexaoService.getProdutosCliente("10").subscribe(result => {
      console.log('result.result',result);
      if(result != null) {
        this.produtos = result;
        this.produtos.sort((a, b) => (a.produtoId < b.produtoId ? -1 : 1));
      }
    });
  }

  limpaCampos() {
    this.mainForm.controls.produto.setValue("");
    this.mainForm.controls.descricao.setValue("");
    this.mainForm.controls.valor.setValue("");    
  }

  onSalvar() {
    if(this.mainForm.controls.descricao.value != null && this.mainForm.controls.produto.value != "" &&
    this.mainForm.controls.valor.value != null && this.mainForm.controls.valor.value > 0) {
      let produto = {
        descricao: this.mainForm.controls.descricao.value,
        produto: this.mainForm.controls.produto.value,
        valor: this.mainForm.controls.valor.value,
        imagem: "",
        cliente_Id: 10,
        produtoId: this.produtoId
      }
      console.log('produto',produto);
      if(this.produtoId == 0) {
        this.conexaoService.gravarProduto(produto).subscribe(result => {
          this.produtos.push(result);
          this.produtos.sort((a, b) => (a.produtoId < b.produtoId ? -1 : 1));
          this.limpaCampos();
          let imagem = {
            tipoRegistro: 3,
            registroId: result.produtoId,
            urlImagem: this.mainForm.controls.urlImagem.value,
          }
          this.conexaoService.gravarImagem(imagem).subscribe(resultImagem => {
            console.log('resultImagem imagem',resultImagem);
            this.mainForm.controls.urlImagem.setValue("");
          })
        });
      } else {
        this.conexaoService.editarProduto(produto).subscribe(result => {
          console.log('result',result);
          this.limpaCampos();
          this.carregaProdutos();
          this.produtoId = 0;
          // let imagem = {
          //   tipoRegistro: 3,
          //   registroId: result.produtoId,
          //   urlImagem: this.mainForm.controls.urlImagem.value,
          // }
        });
      }

      // console.log('usuario',usuario);
    }
  }

  editProduto(produto) {
    this.produtoId = produto.produtoId;
    this.mainForm.controls.produto.setValue(produto.produto);
    this.mainForm.controls.descricao.setValue(produto.descricao);
    this.mainForm.controls.urlImagem.setValue(produto.imagem);
    this.mainForm.controls.valor.setValue(produto.valor);
  }

  deleteProduto(produto) {

  }

}
