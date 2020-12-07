import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mainForm: FormGroup;

  constructor(
    private conexaoService: ConexaoService
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
    console.log('session',sessionStorage.getItem('usuario'));
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null)
    });
  }

  onLogin() {
    if(this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "" &&
    this.mainForm.controls.senha.value != null && this.mainForm.controls.senha.value != "") {
      let login = {
        email: this.mainForm.controls.email.value,
        senha: this.mainForm.controls.senha.value
      }

      this.conexaoService.realizarLogin(login).subscribe(result => {
        console.log('result',result);
        sessionStorage.setItem('token', result.access_token);
        sessionStorage.setItem('usuario', result.user);
      })
    }
  }

}
