import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile.service';
import { Attack, AttackModifier } from '../data-type/attack';
import * as DiceExprModule from '../data-type/dice-expr';

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
    this.profileService.getActiveProfile().attacks = this.attacks;
  }

  rollDamage(attack: Attack, multiplier: number) {

  }

  rollAttack(attack: Attack) {
    console.log('attack with: ', attack);

    const critThreshold = Number(attack.critThreshold!) || 20;
    const critMultiplier = Number(attack.critThreshold!) || 2;
    console.log(critThreshold);

    if (!attack.attack) attack.attack = "0";
    const attackBonusList = attack.attack.split('/');
    console.log(attackBonusList);

    const d20 = DiceExprModule.parse('d20');
    for (const attackBonus of attackBonusList) {
      const attackRoll = DiceExprModule.diceExprAdd(d20, Number(attackBonus));

      const attackResult = attackRoll.eval();

      if (attackResult[0] === 1) {
        // natural 1
        console.log(`Natural 1! (${attackResult[0]})`);
      } else if (attackResult[0] >= critThreshold) {
        // critical hit
        console.log(`critical hit! (${attackResult[0]})`);
      } else {
        // normal
        const attackValue = attackResult.reduce((sum, x) => sum + x);
        console.log(`attack roll: ${attackValue} (${attackResult})`);
      }
    }
  }

  addAttack() {
    // let's use current time (ms since epoch) as uuid.
    this.attacks.push(
      {id: (new Date()).getTime()}
    );
  }
}
