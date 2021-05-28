import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css','../../../node_modules/angular-notifier/styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteComponent implements OnInit {

  mainForm: FormGroup;
  private readonly notifier: NotifierService;

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

  onSalvar() {
    if(this.mainForm.controls.nome.value != null && this.mainForm.controls.nome.value != "" &&
    this.mainForm.controls.cpfCnpj.value != null && this.mainForm.controls.cpfCnpj.value != "" &&
    this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "") {
      let cliente = {
        nome: this.mainForm.controls.nome.value,
        cpfCnpj: this.mainForm.controls.cpfCnpj.value,
        cep: this.mainForm.controls.cep.value == null ? "" : this.mainForm.controls.cep.value.replace("-",""),
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
      console.log('cliente',cliente)
      this.conexaoService.gravarCliente(cliente).subscribe(resultCliente => {
        if(resultCliente != null) {
          this.notifier.notify("success", "Cliente cadastrado com sucesso!");
          let imagem = {
            tipoRegistro: 1,
            registroId: resultCliente.clienteId,
            urlImagem: this.mainForm.controls.urlImagem.value,
            tipoPermissao: 3
          }    
          this.conexaoService.gravarImagem(imagem).subscribe(resultImagem => {
            console.log('resultImagem imagem',resultImagem)
          })
          let acesso = {
            clientId: resultCliente.clienteId,
            qtdAcesso: 0,
            tipoRegistro: this.mainForm.controls.cmbTipoPessoa.value == 1 ? 0 : 1
          }
          this.conexaoService.gravarAcesso(acesso).subscribe(resultAcesso => {
            
          })

          this.router.navigate(["home"]);
        }
      })
      // console.log('usuario',usuario);
    }
  }


}
