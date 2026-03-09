import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule
} from 'ng-apexcharts';
import { DashboardService } from '../default.service';

@Component({
  selector: 'app-default',
  imports: [NgApexchartsModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  monthlyBarOptions: Partial<{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    fill: ApexFill;
    plotOptions: ApexPlotOptions;
  }> | null = null;

  incomeOverviewOptions: typeof this.monthlyBarOptions = null;
  analyticsChartOptions: typeof this.monthlyBarOptions = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.setupMonthlyBarChart(data.topHighItems);
        this.setupIncomeOverviewChart(data.topLowItems);
        this.setupAnalyticsChart(data.warehouseStatus);
      },
      error: (err) => {
        console.error('Dashboard data loading failed', err);
      }
    });
  }

  setupMonthlyBarChart(data: any[]) {
    this.monthlyBarOptions = {
      series: [
        {
          name: 'Quantity',
          data: data.map((item) => item.qty)
        }
      ],
      chart: {
        type: 'bar',
        height: 300
      },
      title: {
        text: 'Top 10 High Quantity Items'
      },
      xaxis: {
        categories: data.map((item) => item.itemName)
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      plotOptions: {
        bar: {
          columnWidth: '55%'
        }
      }
    };
  }

  setupIncomeOverviewChart(data: any[]) {
    this.incomeOverviewOptions = {
      series: [
        {
          name: 'Quantity',
          data: data.map((item) => item.qty)
        }
      ],
      chart: {
        type: 'bar',
        height: 300
      },
      title: {
        text: 'Top 10 Low Quantity Items'
      },
      xaxis: {
        categories: data.map((item) => item.itemName)
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      plotOptions: {
        bar: {
          columnWidth: '55%'
        }
      }
    };
  }

  setupAnalyticsChart(data: any[]) {
    this.analyticsChartOptions = {
      series: [
        {
          name: 'Total Items',
          data: data.map((w) => w.totalItems)
        }
      ],
      chart: {
        type: 'bar',
        height: 300
      },
      title: {
        text: 'Warehouse Status'
      },
      xaxis: {
        categories: data.map((w) => w.name)
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      plotOptions: {
        bar: {
          columnWidth: '55%'
        }
      }
    };
  }
}
