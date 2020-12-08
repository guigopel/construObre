
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../node_modules/angular-notifier/styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

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
      nome: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null)
    });
  }

  onSalvar() {
    if(this.mainForm.controls.nome.value != null && this.mainForm.controls.nome.value != "" &&
    this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "" &&
    this.mainForm.controls.senha.value != null && this.mainForm.controls.senha.value != "") {
      this.notifier.notify("success", "Seu cadastro entá sendo realizado, aguarde um momento!");
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
           this.notifier.notify("success", "Cadastro realizado com sucesso!");
          this.router.navigate(["login"]);
         })
        }
      })
      console.log('usuario',usuario);
    } else {
      this.notifier.notify("error", "Preencha os campos corretamente!");
    }
  }

}
