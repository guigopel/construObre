import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from '../conexao/conexao.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../node_modules/angular-notifier/styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  mainForm: FormGroup;
  private readonly notifier: NotifierService;
  siteKey: string;

  constructor(
    private conexaoService: ConexaoService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.notifier = notifierService;
    // this.siteKey = "6LcAk4AbAAAAAF6jrk5OYpJua3qGbv-diHiQ132d";
  }

  ngOnInit() {
    this.preencheFormGroup();
    console.log('session',sessionStorage.getItem('usuario'));
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null),
      recaptcha: new FormControl(null)
    });
  }

  onLogin() {
    if(this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "" &&
    this.mainForm.controls.senha.value != null && this.mainForm.controls.senha.value != "" && this.mainForm.controls.recaptcha.value != null) {
      let login = {
        email: this.mainForm.controls.email.value,
        senha: this.mainForm.controls.senha.value
      }

      this.conexaoService.realizarLogin(login).subscribe(result => {
        console.log(result);
        if(result.access_token == null) {
          this.notifier.notify("error", "As credenciais de login estão incorretas!");
        } else {
          this.conexaoService.criptParam(result.tipoPermissao.toString(), "tipoPermissao");
          this.conexaoService.criptParam(result.registroId.toString(), "registroId");
          this.conexaoService.criptParam(this.mainForm.controls.email.value.toString(), "email");
          this.notifier.notify("success", "Login efetuado com sucesso!");
          this.conexaoService.criptParam(result.access_token.toString(), "token");
          sessionStorage.setItem('usuario', result.user);
          setTimeout(() => {            
            this.router.navigate(["home"]);
          }, 1000);
        }

      })
    } else {
      this.notifier.notify("error", "Preencha os campos corretamente!");
    }
  }

}
