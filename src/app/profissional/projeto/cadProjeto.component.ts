import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from 'src/app/conexao/conexao.service';

@Component({
  selector: 'app-cadProjeto',
  templateUrl: './cadProjeto.component.html',
  styleUrls: ['./cadProjeto.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadProjetoComponent implements OnInit {
  CryptoJS = require("crypto-js");
  permissao = 0;
  projetoId = 0;
  clienteId = 0;
  imagemId = 0;
  isCadastro = false;
  isEdit = false;
  projetos = [];
  imagemProjeto = [];
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
    this.permissao = this.conexaoService.decriptParam("tipoPermissao");
    console.log(this.conexaoService.decriptParam("registroId"));
    if(!sessionStorage.getItem("tipoPermissao")) {
      this.router.navigate(["home"]);
    }
    console.log('')
    if(this.permissao != 2 && this.permissao != 1) {
      this.notifier.notify("error", "Você não possui permissão para acessar o módulo de projetos!");
      this.router.navigate(["home"]);
    } else {
      this.clienteId = this.conexaoService.decriptParam("registroId");
      this.carregaProjetos();
      
    }
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      projeto: new FormControl(null),
      descricao: new FormControl(null),
      urlImagem: new FormControl(null),
      valor: new FormControl(null),
    });
  }

  carregaProjetos() {
    this.conexaoService.getProjetoByClienteId(this.clienteId).subscribe(result => {
      console.log('result.result',result);
      if(result != null) {
        this.projetos = result;
        this.projetos.sort((a, b) => (a.projetoId < b.projetoId ? -1 : 1));
      }
    });
  }

  limpaCampos() {
    // this.mainForm.controls.projeto.setValue("");
    // this.mainForm.controls.descricao.setValue("");
    // this.mainForm.controls.valor.setValue("");    
  }

  onSalvarImagem() {
    if(this.projetoId == 0) {
      if(this.mainForm.controls.descricao.value != null && this.mainForm.controls.projeto.value != "" &&
      this.mainForm.controls.valor.value != null && this.mainForm.controls.valor.value > 0) {
        this.onSalvar(2);
      } else {
        this.notifier.notify("error", "Você precisa preencher todos os dados do projeto primeiro!");
      }
    } else if(this.mainForm.controls.urlImagem.value == "" || this.mainForm.controls.urlImagem.value == null) {
      this.notifier.notify("success", "Coloque uma url para a imagem antes de salvar!");
    } else {
      let imagem = { 
        imagemId: this.imagemId,
        registroId: this.projetoId,
        tipoRegistro: 2,
        urlImagem: this.mainForm.controls.urlImagem.value
      }
      if(this.imagemId == 0) {
        this.conexaoService.gravarImagem(imagem).subscribe(resultImagem => {
          this.imagemProjeto.push(resultImagem);
          this.mainForm.controls.urlImagem.setValue("");
          this.notifier.notify("success", "Imagem salva com sucesso!");
        });
      } else {
        this.conexaoService.editarImagem(imagem).subscribe(resultEdit => {

        }) 
      }
    }
  }

  onSalvar(acao) {
    if(this.mainForm.controls.descricao.value != null && this.mainForm.controls.projeto.value != "" &&
    this.mainForm.controls.valor.value != null && this.mainForm.controls.valor.value > 0) {
      let projeto = {
        descricao: this.mainForm.controls.descricao.value,
        projeto: this.mainForm.controls.projeto.value,
        valor: this.mainForm.controls.valor.value,
        imagem: "",
        clienteId: this.conexaoService.decriptParam("registroId"),
      }
      console.log('projeto',projeto);
      if(this.projetoId == 0) {
        this.conexaoService.gravarProjeto(projeto).subscribe(result => {
          this.projetoId = result.projetoId;
          this.limpaCampos();
          if(acao == 1) {
            this.notifier.notify("success", "Projeto salvo com sucesso!");
          } else if(acao == 2){
            this.onSalvarImagem();
          }
        });
      } else {
        // this.conexaoService.editarProjeto(projeto).subscribe(result => {
        //   console.log('result',result);
        //   this.limpaCampos();
        //   this.carregaProjetos();
        //   this.projetoId = 0;
        //   // let imagem = {
        //   //   tipoRegistro: 3,
        //   //   registroId: result.projetoId,
        //   //   urlImagem: this.mainForm.controls.urlImagem.value,
        //   // }
        // });
      }

      // console.log('usuario',usuario);
    }
  }

  addProjeto() {
    this.isCadastro = true;    
  }

  editProjeto(projeto) {
    this.isCadastro = true;
    this.projetoId = projeto.projetoId;
    this.mainForm.controls.projeto.setValue(projeto.projeto);
    this.mainForm.controls.descricao.setValue(projeto.descricao);
    this.mainForm.controls.urlImagem.setValue(projeto.imagem);
    this.mainForm.controls.valor.setValue(projeto.valor);
    this.carregaImagem();
  }

  deleteprojeto(projeto) {

  }

  carregaImagem() {
    this.conexaoService.getImagensByProjetoId(this.projetoId).subscribe(result => {
      this.imagemProjeto = result;
    });
  }

  editImagem(imagem,i) {
    this.imagemId = imagem.imagemId;
    this.mainForm.controls.urlImagem.setValue(imagem.urlImagem)
    this.imagemProjeto.splice(i,1)
  }


  deleteImagem(imagem,i) {

  }

}
