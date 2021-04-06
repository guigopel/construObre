import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mainForm: FormGroup;
  clientes = [];
  lojas = [];
  constructor(
    private conexaoService: ConexaoService
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
    this.setPage();
    this.setPageLoja();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      txtPesquisa: new FormControl(null)
    });
  }

  setPage() {
    this.conexaoService.getClientes().subscribe(result => {
      console.log('result.result',result);
      if(result != null) {
        this.clientes = result;
      }
    })
  }

  setPageLoja() {
    this.conexaoService.getLojas().subscribe(result => {
      console.log('result.result',result);
      if(result != null) {
        this.lojas = result;
      }
    })
  }

 pesquisar() {
   if(this.mainForm.controls.txtPesquisa.value != null && this.mainForm.controls.txtPesquisa.value != "") {
     this.conexaoService.getPesquisaClientes(this.mainForm.controls.txtPesquisa.value).subscribe(result => {
       console.log('result',result);
       if(result.id == 0) {
        this.clientes = [];
       } else {
        this.clientes = result;
       }

     })
   }
 }

 limpouPesquisa() {
   if(this.mainForm.controls.txtPesquisa.value == "" || this.mainForm.controls.txtPesquisa.value == null) {
     this.setPage();
   }
 }

}
