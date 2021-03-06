import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombatPageComponent } from './combat-page/combat-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { DicePageComponent } from './dice-page/dice-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/combat', pathMatch: 'full'},
  { path: 'combat', component: CombatPageComponent },
  { path: 'skills', component: SkillsPageComponent },
  { path: 'dice', component: DicePageComponent },
  { path: 'profile', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
