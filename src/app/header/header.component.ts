import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conexaoService: ConexaoService
  ) { }

  ngOnInit() {
    this.isLogado = sessionStorage.getItem('token') == null ? false : true;
    console.log('isLogado',this.isLogado);
  }

  routerLogin() {
    this.router.navigate(["login"]);
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

  routerRegister() {
    this.router.navigate(["registro"]);
  }

  logOut() {
    console.log('sessionStorage.getItem',sessionStorage.getItem('token'));
    this.conexaoService.logout(sessionStorage.getItem('token')).subscribe(result => {
      console.log('result',result);
      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("token");
    })
    console.log('lougout');
  }
}
