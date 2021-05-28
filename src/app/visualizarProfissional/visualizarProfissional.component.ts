
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { ConexaoService } from '../conexao/conexao.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-visualizarProfissional',
  templateUrl: './visualizarProfissional.component.html',
  styleUrls: ['./visualizarProfissional.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualizarProfissionalComponent implements OnInit {

  @ViewChild('starAcabamento') starAcabamento;
  @ViewChild('starOrcamento') starOrcamento;
  @ViewChild('starTempoEntrega') starTempoEntrega;
  @ViewChild('starOrganizacao') starOrganizacao;

  mainForm: FormGroup;
  cliente:any = {};
  projetoDestaque: any = {};
  isMostrar = 0;
  private readonly notifier: NotifierService;
  paramId = -1;
  isListarC = false;
  imagemProjeto = [];
  comentarios = [];
  routerSub: any;

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
    this.routerSub = this.route.params.subscribe(params => {
      this.paramId = params["id"];
      if (this.paramId >= 0) {
        this.carregaProfissional();
      } else {
        this.notifier.notify("error", "Profissional não encontrado!");
        this.router.navigate(["home"]);
      }
    });
  }

  adicionaAcesso() {
    let acesso = {
      acessoId: this.cliente.acessoId,
      registroId: this.paramId,
      tipoRegistro: 0
    }
    this.conexaoService.addQtdAcesso(acesso).subscribe(result => {
      console.log('result',result);
    });
  }

  carregaProfissional() {
    this.conexaoService.getProfissional(this.paramId).subscribe(result => {
      console.log('result',result);
      if (result != null && result.id != 0) {
        this.cliente = result[0];        
        this.adicionaAcesso();
        this.conexaoService.getProjetoByClienteId(this.paramId).subscribe(resultPrj => {
          if (resultPrj != null && resultPrj != undefined && resultPrj.length > 0) {
            this.projetoDestaque = resultPrj[0];
            this.carregaComentario();
            this.conexaoService.getItensProjeto(this.projetoDestaque.projetoId).subscribe(resultImage => {
              this.imagemProjeto = resultImage;
              this.imagemProjeto.map(v => v.isAtivo = false);
              this.imagemProjeto[0].isAtivo = true;
            });
          }
        });
      } else {
        this.notifier.notify("error", "Profissional não encontrado!");
        setTimeout(() => {
          
          this.router.navigate(["home"]);
        }, 500);
      }
    });
  }

  carregaComentario() {
    this.conexaoService.getAvaliacaoByClienteId(this.paramId).subscribe(resultAvaliacoes => {      
      this.comentarios = resultAvaliacoes;
      this.conexaoService.getComentarioByClienteId(this.paramId).subscribe(result => {
        this.comentarios.map((v,i) => {
            v.nome = result[i].nome;
            v.email = result[i].email;
            v.comentarioPessoa = result[i].comentarioPessoa;
        });
      });
    });
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      txtNome: new FormControl(null),
      txtComentario: new FormControl(null)
    });
    setTimeout(() => {
      this.starAcabamento.value = 5;
      this.starOrcamento.value = 5;
      this.starOrganizacao.value = 5;
      this.starTempoEntrega.value = 5;
    }, 1000);
  }

  onSalvar() {
    if (this.mainForm.controls.txtComentario.value != "") {
      let comentario = {
        nome: sessionStorage.getItem("usuario"),
        email: this.conexaoService.decriptParam("email"),
        comentarioPessoa: this.mainForm.controls.txtComentario.value,
        clienteId: this.paramId,
        usuarioId: this.conexaoService.decriptParam("registroId"),
        horaComentario: moment(Date()).format('HH:mm'),
        dataComentario: moment(Date()).format('DD/MM/YYYY')
      };
      let avaliacao = {
        orcamento: this.starOrcamento.value,
        acabamento: this.starAcabamento.value,
        tempoEntrega: this.starTempoEntrega.value,
        organizacao: this.starOrganizacao.value,
        clienteId: this.paramId,
        usuarioId: this.conexaoService.decriptParam("registroId"),
        dataAvaliacao: moment(Date()).format('HH:mm'),
        horaAvaliacao: moment(Date()).format('DD/MM/YYYY')
      }
      this.conexaoService.gravarComentario(comentario).subscribe(result => {
        this.conexaoService.gravarAvaliacao(avaliacao).subscribe(result => {
          this.notifier.notify("success", "Avaliação gravada com sucesso :)!");
          this.limpaComentario();
          this.carregaComentario();
        })
      })
    }
  }

  limpaComentario() {
    this.mainForm.controls.txtComentario.setValue("");
    this.starAcabamento.value = 5;
    this.starOrganizacao.value = 5;
    this.starOrcamento.value = 5;
    this.starTempoEntrega.value = 5;
  }

  imagemAnterior() {
    let tamanho = this.imagemProjeto.length;
    let indice = this.imagemProjeto.findIndex(i => i.isAtivo == true);
    if (indice == 0) {
      this.imagemProjeto[indice].isAtivo = false;
      this.imagemProjeto[tamanho - 1].isAtivo = true;
    } else
      if (this.imagemProjeto.length > 1) {
        this.imagemProjeto[indice].isAtivo = false;
        this.imagemProjeto[indice - 1].isAtivo = true;
      }
  }

  imagemPosterior() {
    let tamanho = this.imagemProjeto.length;
    let indice = this.imagemProjeto.findIndex(i => i.isAtivo == true);
    if (indice == tamanho - 1) {
      this.imagemProjeto[indice].isAtivo = false;
      this.imagemProjeto[0].isAtivo = true;
    } else {
      this.imagemProjeto[indice].isAtivo = false;
      this.imagemProjeto[indice + 1].isAtivo = true;
    }
  }

  atualizaGrid(tipo) {
    if (tipo == 0) {
      // this.isMostrar = tipo;
    } else if (tipo == 1) {

    } else {

    }
    this.isMostrar = tipo;
  }

}
