import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile.service';
import { Attack, AttackModifier } from '../data-type/attack';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.css']
})
export class CombatPageComponent implements OnInit {

  attacks!: Attack[];
  attackModifiers!: AttackModifier[];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    const profile = this.profileService.getActiveProfile();
    this.attacks = profile.attacks;
    this.attackModifiers = profile.attackModifiers;
  }

  deleteAttack(attack: Attack) {
    this.attacks = this.attacks.filter(x => x.id !== attack.id);
  }

  rollATtack(attack: Attack) {

  }

  addAttack() {
    // let's use current time (ms since epoch) as uuid.
    this.attacks.push(
      {id: (new Date()).getTime()}
    );
  }
}
