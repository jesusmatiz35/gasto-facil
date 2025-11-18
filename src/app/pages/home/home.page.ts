import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  balance = 0;

  constructor(private expenseSvc: ExpenseService, private router: Router) {}

  ngOnInit() {
    this.updateBalance();
    this.expenseSvc.expenses$.subscribe(() => this.updateBalance());
  }

  updateBalance() {
    this.balance = this.expenseSvc.getBalance();
  }

  goRegister(type: 'expense' | 'income') {
    this.router.navigate(['/register'], { state: { type } });
  }

  openReports() {
    this.router.navigate(['/reports']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }
}
