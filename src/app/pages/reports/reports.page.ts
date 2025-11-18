import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  templateUrl: 'reports.page.html',
  styleUrls: ['reports.page.scss']
})
export class ReportsPage implements OnInit, AfterViewInit {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;
  categories: { category: string; amount: number }[] = [];
  selectedCategory = '';

  constructor(private expenseSvc: ExpenseService) {}

  ngOnInit() {
    this.expenseSvc.expenses$.subscribe(() => {
      this.updateData();
      this.renderChart();
    });
  }

  ngAfterViewInit() {
    this.updateData();
    this.renderChart();
  }

  updateData() {
    this.categories = this.expenseSvc.getByCategory();
    if (this.categories.length) {
      this.selectedCategory = this.categories[0].category;
    }
  }

  renderChart() {
    if (!this.pieCanvas) return;
    const labels = this.categories.map(c => c.category);
    const data = this.categories.map(c => c.amount);
    const colors = ['#4da6ff', '#66cc66', '#ff9966', '#ffcc66', '#c266ff', '#b3b3b3'];

    if (this.chart) {
      this.chart.data.labels = labels;
      (this.chart.data.datasets[0].data as number[]) = data;
      this.chart.update();
      return;
    }

    const cfg: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Gastos',
            data,
            backgroundColor: colors,
            borderColor: '#1e90ff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    this.chart = new Chart(this.pieCanvas.nativeElement.getContext('2d')!, cfg);
  }
}
