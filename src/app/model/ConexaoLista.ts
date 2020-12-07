export class ConexaoLista<T> {

  totalRegistros: number;
  lista: T[];

  constructor(totalRegistros: number, lista: T[]){
      this.totalRegistros = totalRegistros;
      this.lista = lista;
  }
}
