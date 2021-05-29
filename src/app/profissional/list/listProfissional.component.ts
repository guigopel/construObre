import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexaoService } from '../../conexao/conexao.service';

@Component({
  selector: 'app-listProfissional',
  templateUrl: './listProfissional.component.html',
  styleUrls: ['./listProfissional.component.css']
})
export class ListProfissionalComponent implements OnInit {
  mainForm: FormGroup;
  clientes = [];
  produtos = [];
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
    this.conexaoService.getClientes().subscribe(result => {
      console.log('result.result',result);
      for (let i = 0; i < 5; i++) {
        this.clientes.push(result[0]);
        
      }
    });
  }

  
  visualizarPro(row) {
    console.log('chegou aqui',row);
    this.router.navigate(["profissional/" + row.clienteId]);
  }

}
