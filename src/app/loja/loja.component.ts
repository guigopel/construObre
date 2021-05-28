
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { ConexaoService } from '../conexao/conexao.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LojaComponent implements OnInit {

  mainForm: FormGroup;
  cliente = {};
  projetoDestaque: any = {};
  isMostrar = 0;
  private readonly notifier: NotifierService;
  paramId = -1;
  isListarC = false;
  produtos = [];
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

  carregaProfissional() {
    this.conexaoService.getProfissional(this.paramId).subscribe(result => {
      if (result != null && result.id != 0) {
        this.cliente = result[0];
        this.conexaoService.getProdutosCliente(this.paramId.toString()).subscribe(result => {
          console.log('result.result', result);
          if (result != null) {
            this.produtos = result;
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
    this.conexaoService.getComentarioByClienteId(this.paramId).subscribe(result => {
      this.comentarios = result;
    });
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      txtNome: new FormControl(null),
      txtComentario: new FormControl(null)
    });
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
      this.conexaoService.gravarComentario(comentario).subscribe(result => {

      })
    }
  }

  limpaComentario() {
    this.mainForm.controls.txtComentario.setValue("");
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
