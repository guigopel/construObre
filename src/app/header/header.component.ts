import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogado = false;
  isTipo = 0;
  private readonly notifier: NotifierService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conexaoService: ConexaoService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
   }

  ngOnInit() {
    if(sessionStorage.getItem('token') == 'null' || sessionStorage.getItem('token') == null) {
      this.isLogado = false;
    } else {
      this.isTipo = this.conexaoService.decriptParam("tipoPermissao");      
      this.isLogado = true;
    }
    
  }

  navigateHeader(rota) {
    switch (rota) {
      case '0':
        this.router.navigate(["home"]);
        break;

      case '1':
        this.router.navigate(["profissionais"]);
        break;

      case '2':
        this.router.navigate(["lojas"]);
        break;

      case '3':
        // this.router.navigate(["contato"]);
        break;
    }
  }

  logOut() {
      this.notifier.notify("success", "Logout realizado com sucesso. Volte sempre =D!");
      sessionStorage.clear();
      this.isTipo = 0;
      setTimeout(() => {
        if(sessionStorage.getItem('token') == 'null' || sessionStorage.getItem('token') == null) {
          this.isLogado = false;
        } else {          
          this.isLogado = true;
        }
        this.router.navigate(["login"]);
      }, 500);

  }
}
