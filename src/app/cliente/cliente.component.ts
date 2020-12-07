import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConexaoService } from '../conexao/conexao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  mainForm: FormGroup;

  constructor(
    private conexaoService: ConexaoService,
  ) { }

  ngOnInit() {
    this.preencheFormGroup();
  }

  preencheFormGroup() {
    this.mainForm = new FormGroup({
      cmbTipoCliente: new FormControl(null),
      nome: new FormControl(null),
      cpfCnpj: new FormControl(null),
      cep: new FormControl(null),
      cidade: new FormControl(null),
      logradouro: new FormControl(null),
      numero: new FormControl(null),
      bairro: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null),
      projeto: new FormControl(null),
      valor: new FormControl(null),
      obsProjeto: new FormControl(null),
      urlImagem: new FormControl(null),
      urlProfissional: new FormControl(null),
    });
  }

  onSalvar() {
    if(this.mainForm.controls.nome.value != null && this.mainForm.controls.nome.value != "" &&
    this.mainForm.controls.cpfCnpj.value != null && this.mainForm.controls.cpfCnpj.value != "" &&
    this.mainForm.controls.email.value != null && this.mainForm.controls.email.value != "") {
      let cliente = {
        nome: this.mainForm.controls.nome.value,
        cpfCnpj: this.mainForm.controls.cpfCnpj.value,
        cep: this.mainForm.controls.cep.value == null ? "" : this.mainForm.controls.cep.value.replace("-",""),
        cidade: "Pelotas",
        logradouro: this.mainForm.controls.logradouro.value == null ? "" : this.mainForm.controls.logradouro.value,
        numero: this.mainForm.controls.numero.value == null ? "" : this.mainForm.controls.numero.value,
        bairro: this.mainForm.controls.bairro.value == null ? "" : this.mainForm.controls.bairro.value,
        telefone: this.mainForm.controls.telefone.value == null ? "" : this.mainForm.controls.telefone.value,
        tipoCliente: 1,
        // complemento: ,
        // referencial: ,
        // urlProfissional: this.mainForm.controls.urlProfissional.value,
        email: this.mainForm.controls.email.value,
        senha: '1234'

      }
      this.conexaoService.gravarCliente(cliente).subscribe(resultCliente => {
        console.log('resultCliente cliente',resultCliente);
        if(resultCliente != null) {

          let imagem = {
            tipoRegistro: 1,
            registroId: resultCliente.clienteId,
            urlImagem: this.mainForm.controls.urlImagem.value,
            tipoPermissao: 3
          }

          let projeto = {
            projeto: this.mainForm.controls.projeto.value,
            valor: this.mainForm.controls.valor.value,
            cliente_Id: resultCliente.clienteId
          }

          this.conexaoService.gravarProjeto(projeto).subscribe(resultProjeto => {
            console.log('resultProjeto projeto',resultProjeto);
          })

          this.conexaoService.gravarImagem(imagem).subscribe(resultImagem => {
            console.log('resultImagem imagem',resultImagem)

          })

        }
      })
      // console.log('usuario',usuario);
    }
  }


}
