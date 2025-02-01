import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
  { path: 'home', component: TableComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
