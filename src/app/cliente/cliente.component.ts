import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css', '../../../node_modules/angular-notifier/styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteComponent implements OnInit {

  mainForm: FormGroup;
  private readonly notifier: NotifierService;
  paramId = 0;
  permissao = 0;

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
    if (sessionStorage.getItem("registroId") == null) {
      this.notifier.notify("error", "Você não tem permissao para acessar!");
      setTimeout(() => {
        this.router.navigate(["home"]);
      }, 1000);
    }
    else if (this.paramId != null && this.paramId != 0 && this.permissao != 1) {
      this.paramId = this.conexaoService.decriptParam("registroId");
      this.permissao = this.conexaoService.decriptParam("tipoPermissao");
      this.verificaTipo();
    }
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      cmbTipoPessoa: new FormControl(null),
      nome: new FormControl(null),
      cpfCnpj: new FormControl(null),
      cep: new FormControl(null),
      cidade: new FormControl(null),
      logradouro: new FormControl(null),
      numero: new FormControl(null),
      bairro: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null),
      projeto: new FormControl(null),
      valor: new FormControl(null),
      obsProjeto: new FormControl(null),
      urlImagem: new FormControl(null),
      urlProfissional: new FormControl(null),
    });
    this.mainForm.controls.cidade.setValue("Pelotas");
    this.mainForm.controls.cmbTipoPessoa.setValue("1");
  }

  verificaTipo() {
    if (this.permissao == 4) {
      this.conexaoService.getUsuario(this.paramId).subscribe(result => {
        this.carregaForm(result);
      });
    } else {
      this.conexaoService.getProfissional(this.paramId).subscribe(result => {
        this.carregaForm(result);
      });
    }
  }

  carregaForm(result) {
    console.log('result', result);
    if (result != null) {
      this.mainForm.controls.nome.setValue(result[0].nome != null ? result[0].nome : "");
      this.mainForm.controls.cpfCnpj.setValue(result[0].cpfCnpj != null ? result[0].cpfCnpj : "");
      this.mainForm.controls.cep.setValue(result[0].cep != null ? result[0].cep : "");
      this.mainForm.controls.cidade.setValue(result[0].cidade != null ? result[0].cidade : "");
      this.mainForm.controls.logradouro.setValue(result[0].logradouro != null ? result[0].logradouro : "");
      this.mainForm.controls.numero.setValue(result[0].numero != null ? result[0].numero : "");
      this.mainForm.controls.bairro.setValue(result[0].bairro != null ? result[0].bairro : "");
      this.mainForm.controls.telefone.setValue(result[0].telefone != null ? result[0].telefone : "");
      this.mainForm.controls.cmbTipoPessoa.setValue(result[0].tipoCliente != null ? result[0].tipoCliente.toString() : "");
      this.mainForm.controls.urlProfissional.setValue(result[0].urlProfissional != null ? result[0].urlProfissional : "");
      this.mainForm.controls.email.setValue(result[0].email != null ? result[0].email : "");
    }
  }

  onSalvar() {
    if (this.mainForm.controls.nome.value != null && this.mainForm.controls.nome.value != "" &&
      this.mainForm.controls.cpfCnpj.value != null && this.mainForm.controls.cpfCnpj.value != "" &&
      this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "") {
      let cliente = {
        nome: this.mainForm.controls.nome.value,
        cpfCnpj: this.mainForm.controls.cpfCnpj.value,
        cep: this.mainForm.controls.cep.value == null ? "" : this.mainForm.controls.cep.value.replace("-", ""),
        cidade: this.mainForm.controls.cidade.value,
        logradouro: this.mainForm.controls.logradouro.value == null ? "" : this.mainForm.controls.logradouro.value,
        numero: this.mainForm.controls.numero.value == null ? "" : this.mainForm.controls.numero.value,
        bairro: this.mainForm.controls.bairro.value == null ? "" : this.mainForm.controls.bairro.value,
        telefone: this.mainForm.controls.telefone.value == null ? "" : this.mainForm.controls.telefone.value,
        tipoCliente: this.mainForm.controls.cmbTipoPessoa.value,
        urlProfissional: this.mainForm.controls.urlProfissional.value,
        email: this.mainForm.controls.email.value,
        senha: '1234'

      }
      console.log('cliente', cliente)
      this.conexaoService.gravarCliente(cliente).subscribe(resultCliente => {
        if (resultCliente != null) {
          this.notifier.notify("success", "Cliente cadastrado com sucesso!");
          let acesso = {
            registroId: resultCliente.clienteId,
            qtdAcesso: 0,
            tipoRegistro: this.mainForm.controls.cmbTipoPessoa.value == 1 ? 0 : 1
          }
          this.conexaoService.gravarAcesso(acesso).subscribe(resultAcesso => {

          })
          let login = {
            nome: this.mainForm.controls.nome.value,
            email: this.mainForm.controls.email.value,
            senha: '1234',
            tipoPermissao: this.mainForm.controls.cmbTipoPessoa.value == 1 ? 2 : 3,
            registroId: resultCliente.clienteId
          }

          this.conexaoService.gravarLogin(login).subscribe(result => {
            // this.notifier.notify("success", "Cadastro realizado com sucesso!");
            // this.router.navigate(["login"]);
          })
          this.router.navigate(["home"]);
        }
      })
      // console.log('usuario',usuario);
    }
  }


}
