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
      console.log('aqui');
      this.isLogado = true;
    }

    console.log('isLogado',sessionStorage.getItem('token'));
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
        // this.router.navigate(["lojas"]);
        break;

      case '3':
        // this.router.navigate(["contato"]);
        break;
    }
  }

  logOut() {
      // this.notifier.notify("success", "Logout realizado com sucesso. Volte sempre =D!");
      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("token");

      setTimeout(() => {
        if(sessionStorage.getItem('token') == 'null' || sessionStorage.getItem('token') == null) {
          this.isLogado = false;
        } else {
          console.log('aqui');
          this.isLogado = true;
        }
        this.router.navigate(["login"]);
      }, 100);

  }
}
