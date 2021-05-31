import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { ConexaoService } from '../../conexao/conexao.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-relacaoLoja',
  templateUrl: './relacaoLoja.component.html',
  styleUrls: ['./relacaoLoja.component.css']
})
export class RelacaoLojaComponent implements OnInit {
  mainForm: FormGroup;
  public chartOptions: Partial<any>;
  lojas = [];
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
   }

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
      if(result.length == 1) {
        this.lojas.push(result[0]);
        this.lojas.map(cli => {
          if(cli.qtdAcesso > 0) {
            this.chartOptions.series.push(cli.qtdAcesso);
            this.chartOptions.labels.push(cli.nome);
          }
        });
      } else {
        this.lojas = result;
        this.lojas.map(cli => {
          if(cli.qtdAcesso > 0) {
            this.chartOptions.series.push(cli.qtdAcesso);
            this.chartOptions.labels.push(cli.nome);
          }
        });
      }
    })
  }

  
  visualizarLoja(row) {
    console.log('chegou aqui',row);
    this.router.navigate(["lojas/" + row.clienteId]);
  }

}
