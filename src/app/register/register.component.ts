
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mainForm: FormGroup;

  constructor(
    private conexaoService: ConexaoService
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null)
    });
  }

  onSalvar() {
    if(this.mainForm.controls.nome.value != null && this.mainForm.controls.nome.value != "" &&
    this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "" &&
    this.mainForm.controls.senha.value != null && this.mainForm.controls.senha.value != "") {
      let usuario = {
        nome: this.mainForm.controls.nome.value,
        cpfCnpj: '',
        cep: '',
        cidade: '',
        logradouro: '',
        numero: '',
        bairro: '',
        telefone: '',
        tipoCliente: 1,
        // complemento: ,
        // referencial: ,
        email: this.mainForm.controls.email.value,
        senha: this.mainForm.controls.senha.value,

      }
      this.conexaoService.gravarUsuario(usuario).subscribe(result => {
        console.log('result usuario',result);
        if(result != null) {
          let login = {
            nome: result.nome,
            email: result.email,
            senha: this.mainForm.controls.senha.value,
            tipoPermissao: 3,
            registroId: result.usuarioId
          }

         this.conexaoService.gravarLogin(login).subscribe(result => {
          console.log('result login',result);
         })
        }
      })
      console.log('usuario',usuario);
    }
  }

}
