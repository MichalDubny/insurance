import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./insurance/insurance.module').then((m) => m.InsuranceModule), },
  { path: 'insurance', loadChildren: () => import('./insurance/insurance.module').then((m) => m.InsuranceModule), },
  { path: '**', loadChildren: () => import('./insurance/insurance.module').then((m) => m.InsuranceModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
