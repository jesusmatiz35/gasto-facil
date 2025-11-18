import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { RegisterExpensePage } from './pages/register-expense/register-expense.page';
import { ReportsPage } from './pages/reports/reports.page';
import { SettingsPage } from './pages/settings/settings.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: RegisterExpensePage },
  { path: 'reports', component: ReportsPage },
  { path: 'settings', component: SettingsPage },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
