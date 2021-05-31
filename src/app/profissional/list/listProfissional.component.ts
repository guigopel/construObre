import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexaoService } from '../../conexao/conexao.service';
import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-listProfissional',
  templateUrl: './listProfissional.component.html',
  styleUrls: ['./listProfissional.component.css']
})
export class ListProfissionalComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  mainForm: FormGroup;
  clientes = [];
  produtos = [];
  constructor(
    private conexaoService: ConexaoService,
    private router: Router,
  ) {
    this.chartOptions = {
      labels: [],
      series: [],
      chart: {
        width: 580,
        type: "pie"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.conexaoService.getClientes().subscribe(result => {
      this.clientes = result;
      this.clientes.map(cli => {
        if(cli.qtdAcesso > 0) {
          this.chartOptions.series.push(cli.qtdAcesso);
          this.chartOptions.labels.push(cli.nome);
        }
      });
      console.log('this.chartOptions',this.chartOptions);
    });
}

ngOnInit() {
  this.preencheFormGroup();
  // this.setPage();
}

preencheFormGroup() {
  this.mainForm = new FormGroup({
    txtPesquisa: new FormControl(null)
  });
}

setPage() {
  this.conexaoService.getClientes().subscribe(result => {
    this.clientes = result;
    this.clientes.map(cli => {
      if(cli.qtdAcesso > 0) {
        // this.chartOptions.series.push(cli.qtdAcesso);
        // this.chartOptions.labels.push(cli.nome);
      }
    });
    console.log('this.chartOptions',this.chartOptions);
  });
}


visualizarPro(row) {
  this.router.navigate(["profissional/" + row.clienteId]);
}
  

}
