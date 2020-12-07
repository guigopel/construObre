import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastroComponent implements OnInit {

  @ViewChild("cmbTipoCliente") cmbTipoCliente;

  mainForm: FormGroup;

  arrayTipoCliente = [
    {id: 0, nome: 'Pessoa física'},
    {id: 1, nome: 'Pessoa jurídica'}
  ];

  tipoCliente = 0;

  constructor(
    private conexaoService: ConexaoService,
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      cmbTipoCliente: new FormControl(null),
      nomeRazaoSocial: new FormControl(null),
      cpfCnpj: new FormControl(null),
      cep: new FormControl(null),
      cidade: new FormControl(null),
      logradouro: new FormControl(null),
      numero: new FormControl(null),
      bairro: new FormControl(null),
      complemento: new FormControl(null),
      referencial: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null),
      senha: new FormControl(null)
    });
  }

  teste() {
    console.log('this.mainForm.controls.nomeRazaoSocial.value',this.mainForm.controls.nomeRazaoSocial.value);
    console.log('this.mainForm.controls.cpfCnpj.value',this.mainForm.controls.cpfCnpj.value);
    console.log('this.mainForm.controls.cep.value',this.mainForm.controls.cep.value);
    console.log('this.mainForm.controls.cidade.value',this.mainForm.controls.cidade.value);
    console.log('this.mainForm.controls.logradouro.value',this.mainForm.controls.logradouro.value);
    console.log('this.mainForm.controls.numero.value',this.mainForm.controls.numero.value);
    console.log('this.mainForm.controls.bairro.value',this.mainForm.controls.bairro.value);
    console.log('this.mainForm.controls.complemento.value',this.mainForm.controls.complemento.value);
    console.log('this.mainForm.controls.referencial.value',this.mainForm.controls.referencial.value);
    console.log('this.mainForm.controls.email.value',this.mainForm.controls.email.value);
    console.log('this.mainForm.controls.senha.value',this.mainForm.controls.senha.value);
    console.log('this.mainForm.controls.nomeRazaoSocial.value',this.mainForm.controls['cmbTipoCliente'].value);
  }

  trocouTipoCliente(event) {
    this.tipoCliente = event.value == 0 ? 0 : 1;
  }


  onSalvar() {
    if(this.mainForm.controls.nomeRazaoSocial.value != null && this.mainForm.controls.nomeRazaoSocial.value != "" &&
    this.mainForm.controls.cpfCnpj.value != null && this.mainForm.controls.cpfCnpj.value != "" &&
    this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "" &&
    this.mainForm.controls.senha.value != null && this.mainForm.controls.senha.value != "") {
      let usuario = {
        nome: this.mainForm.controls.nomeRazaoSocial.value,
        cpfCnpj: this.mainForm.controls.cpfCnpj.value,
        cep: this.mainForm.controls.cep.value == null ? "" : this.mainForm.controls.cep.value.replace("-",""),
        cidade: this.mainForm.controls.cidade.value == null ? "" : this.mainForm.controls.cidade.value,
        logradouro: this.mainForm.controls.logradouro.value == null ? "" : this.mainForm.controls.logradouro.value,
        numero: this.mainForm.controls.numero.value == null ? "" : this.mainForm.controls.numero.value,
        bairro: this.mainForm.controls.bairro.value == null ? "" : this.mainForm.controls.bairro.value,
        telefone: this.mainForm.controls.telefone.value == null ? "" : this.mainForm.controls.telefone.value,
        tipoCliente: 1,
        // complemento: ,
        // referencial: ,
        email: this.mainForm.controls.email.value,
        senha: this.mainForm.controls.senha.value,

      }
      this.conexaoService.gravarUsuario(usuario).subscribe(result => {
        if(result != null) {
          let login = {
            nome: result.nome,
            email: result.email,
            senha: this.mainForm.controls.senha.value,
            tipoPermissao: 3,
            registroId: result.usuarioId
          }

         this.conexaoService.gravarLogin(login).subscribe(result => {

         })
        }
      })
      console.log('usuario',usuario);
    }
  }
}
