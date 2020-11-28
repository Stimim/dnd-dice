import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileService } from '../profile.service';
import { Attack, AttackModifier } from '../data-type/attack';
import * as DiceExprModule from '../data-type/dice-expr';

export interface AttackResultDialogData {
  attack: Attack;
};

interface AttackResult {
  attackMessage?: string;
  attackRoll: number;
  attackTotal: number;
  damageEvalResult: number[];
  damageTotal: number;
};

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.css']
})
export class CombatPageComponent implements OnInit {

  attacks!: Attack[];
  attackModifiers!: AttackModifier[];

  constructor(private profileService: ProfileService, public dialog: MatDialog) { }

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
    const damageRollExpr: DiceExprModule.Expr = DiceExprModule.parse(attack.damage!);
    const retval: number[] = [];
    for (let i = 0; i < multiplier; i++) {
      const result = damageRollExpr.eval();
      retval.push(...result);
    }
    return retval;
  }

  rollAttack(attack: Attack) {
    console.log('attack with: ', attack);

    const critThreshold = Number(attack.critThreshold!) || 20;
    const critMultiplier = Number(attack.critMultiplier!) || 2;
    console.log(critThreshold);

    if (!attack.attack) attack.attack = "0";
    const attackBonusList = attack.attack.split('/');
    console.log(attackBonusList);

    const d20 = DiceExprModule.parse('d20');

    const attackResultList: AttackResult[] = [];

    for (const attackBonus of attackBonusList) {
      const attackRoll = d20.eval()[0];

      const attackTotal = attackRoll + Number(attackBonus);
      let damageEvalResult: number[] = [];
      let attackMessage;

      if (attackRoll === 1) {
        // natural 1
        console.log(`Natural 1! (${attackRoll})`);
        attackMessage = 'Natural 1';
      } else if (attackRoll >= critThreshold) {
        // critical hit
        console.log(`critical hit! (${attackRoll})`);
        damageEvalResult = this.rollDamage(attack, critMultiplier);
        attackMessage = 'Crit. Hit';
      } else {
        // normal
        console.log(`attack roll: ${attackTotal} (${attackRoll})`);
        damageEvalResult = this.rollDamage(attack, 1);
      }

      const attackResult: AttackResult = {
        attackMessage,
        attackRoll: attackRoll,
        attackTotal: attackTotal,
        damageEvalResult: damageEvalResult,
        damageTotal: damageEvalResult.reduce((sum, x) => sum + x, 0),
      };

      attackResultList.push(attackResult);
    }

    this.showAttackResultDialog(attackResultList);
  }

  showAttackResultDialog(attackResultList: AttackResult[]) {
    const dialogRef = this.dialog.open(AttackResultDialog, { data: attackResultList });
  }

  addAttack() {
    // let's use current time (ms since epoch) as uuid.
    this.attacks.push(
      {id: (new Date()).getTime()}
    );
  }
}

@Component({
  selector: 'attack-result-dialog',
  templateUrl: './attack-result-dialog.html',
})
export class AttackResultDialog {
  constructor(
    public dialogRef: MatDialogRef<AttackResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AttackResult[]) {}
}
