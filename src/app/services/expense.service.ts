import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { BehaviorSubject } from 'rxjs';
import { uuid } from './uuid';

// Simple in-memory service. You can replace by storage/localForage later.
@Injectable()
export class ExpenseService {
  private _expenses: Expense[] = [];
  expenses$ = new BehaviorSubject<Expense[]>([]);
  limit$ = new BehaviorSubject<number>(300000);
  notifications$ = new BehaviorSubject<boolean>(true);

  constructor() {
    // seed sample data
    this._expenses = [
      { id: uuid(), amount: 50000, category: 'Alimentación', date: new Date().toISOString(), description: 'Supermercado', type: 'expense' },
      { id: uuid(), amount: 80000, category: 'Entretenimiento', date: new Date().toISOString(), description: 'Cine', type: 'expense' },
      { id: uuid(), amount: 200000, category: 'Sueldo', date: new Date().toISOString(), description: 'Pago', type: 'income' }
    ];
    this.emit();
  }

  private emit() {
    this.expenses$.next([...this._expenses]);
  }

  add(e: Expense) {
    e.id = uuid();
    this._expenses.push(e);
    this.emit();
  }

  getBalance(): number {
    const income = this._expenses.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = this._expenses.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    return income - expense;
  }

  getByCategory() {
    const map = new Map<string, number>();
    this._expenses.filter(x => x.type === 'expense').forEach(e => {
      const prev = map.get(e.category) || 0;
      map.set(e.category, prev + e.amount);
    });
    return Array.from(map.entries()).map(([cat, sum]) => ({ category: cat, amount: sum }));
  }

  setLimit(value: number) {
    this.limit$.next(value);
  }

  setNotifications(enabled: boolean) {
    this.notifications$.next(enabled);
  }
}
