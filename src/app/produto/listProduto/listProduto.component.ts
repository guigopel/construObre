import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConexaoService } from '../../conexao/conexao.service';

@Component({
  selector: 'app-listProduto',
  templateUrl: './listProduto.component.html',
  styleUrls: ['./listProduto.component.css']
})
export class ListProdutoComponent implements OnInit {
  mainForm: FormGroup;
  clientes = [];
  produtos = [];
  constructor(
    private conexaoService: ConexaoService
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
    this.setPageProdutos();
    // this.setPageLoja();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      txtPesquisa: new FormControl(null)
    });
  }

  // setPage() {
  //   this.conexaoService.getClientes().subscribe(result => {
  //     console.log('result.result',result);
  //     if(result != null) {
  //       this.clientes = result;
  //     }
  //   })
  // }

  setPageProdutos() {

    this.conexaoService.getProdutos().subscribe(result => {
      console.log('result.result',result);
      if(result != null) {
        this.produtos = result;
      }
      console.log("this.produtos",this.produtos);
    })
  }

}
