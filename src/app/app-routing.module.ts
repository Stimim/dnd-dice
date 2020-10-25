import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombatPageComponent } from './combat-page/combat-page.component';

const routes: Routes = [
  { path: 'combat', component: CombatPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
