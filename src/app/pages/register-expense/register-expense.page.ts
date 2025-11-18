import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-expense',
  templateUrl: 'register-expense.page.html',
  styleUrls: ['register-expense.page.scss']
})
export class RegisterExpensePage implements OnInit {
  amount = null as number | null;
  category = '';
  date = new Date().toISOString();
  description = '';
  type: 'expense' | 'income' = 'expense';
  categories = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Vivienda', 'Otros'];

  constructor(private expenseSvc: ExpenseService, private router: Router, private location: Location) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && (nav.extras.state as any).type) {
      this.type = (nav.extras.state as any).type;
    }
  }

  ngOnInit() {}

  guardar() {
    if (!this.amount || !this.category) {
      alert('Por favor ingresa monto y categoría.');
      return;
    }
    this.expenseSvc.add({
      id: '',
      amount: this.amount,
      category: this.category,
      date: this.date,
      description: this.description,
      type: this.type
    });
    this.location.back();
  }
}
