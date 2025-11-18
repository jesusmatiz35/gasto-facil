import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  limit = 0;
  notifications = true;

  constructor(private expenseSvc: ExpenseService, private location: Location) {}

  ngOnInit() {
    this.limit = this.expenseSvc.limit$.value;
    this.notifications = this.expenseSvc.notifications$.value;
  }

  saveLimit() {
    this.expenseSvc.setLimit(this.limit);
    alert('Límite actualizado');
  }

  toggleNotifications() {
    this.expenseSvc.setNotifications(this.notifications);
  }

  back() {
    this.location.back();
  }
}
