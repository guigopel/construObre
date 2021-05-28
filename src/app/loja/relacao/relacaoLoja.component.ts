import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexaoService } from '../../conexao/conexao.service';

@Component({
  selector: 'app-relacaoLoja',
  templateUrl: './relacaoLoja.component.html',
  styleUrls: ['./relacaoLoja.component.css']
})
export class RelacaoLojaComponent implements OnInit {
  mainForm: FormGroup;
  lojas = [];
  constructor(
    private conexaoService: ConexaoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
    this.setPage();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      txtPesquisa: new FormControl(null)
    });
  }


  setPage() {
    this.conexaoService.getLojas().subscribe(result => {
      console.log('result.result',result);
      if(result != null && result.id != 0) {
        this.lojas = result.length == 1 ? result[0] : result;
      }
    })
  }

  
  visualizarLoja(row) {
    console.log('chegou aqui',row);
    this.router.navigate(["lojas/" + row.clienteId]);
  }

}
