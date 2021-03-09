import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../profile.service';
import { Attack, AttackModifier } from '../data-type/attack';
import { Profile } from '../data-type/profile';
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

interface QuickModifier {
  attackBonus: number;
  damageBonus: number;
};

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.css']
})
export class CombatPageComponent implements OnInit {

  attacks!: Attack[];
  attackModifiers!: AttackModifier[];
  lastAttackResultList: AttackResult[] = [];

  quickModifier: QuickModifier = {
    attackBonus: 0,
    damageBonus: 0,
  };

  quickModifierForm!: FormGroup;

  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog) {
    this.profileService.profileChanged.subscribe(
      (newProfile: Profile) => {
        this.attacks = newProfile.attacks;
        this.attackModifiers = newProfile.attackModifiers;
      });
  }

  ngOnInit(): void {
    const profile = this.profileService.getActiveProfile();
    this.attacks = profile.attacks;
    this.attackModifiers = profile.attackModifiers;

    this.quickModifierForm = new FormGroup({
      attackBonus: new FormControl(
        this.quickModifier.attackBonus),
      damageBonus: new FormControl(
        this.quickModifier.damageBonus),
    });
    const model: any = this.quickModifier;
    for (const key of Object.keys(this.quickModifierForm.controls)) {
      this.quickModifierForm.controls[key].valueChanges.subscribe(
        (v) => {model[key] = v;}
      );
    }
  }

  rollDamage(attack: Attack, isCriticalHit: boolean, modifiers: AttackModifier[]) {
    const damageRollExpr = DiceExprModule.parse(attack.damage!);
    const critMultiplier = Number(attack.critMultiplier!) || 2;
    const retval: number[] = [];

    const multiplier = isCriticalHit ? critMultiplier : 1;

    for (let i = 0; i < multiplier; i++) {
      const result = damageRollExpr.eval();
      retval.push(...result);
    }

    if (isCriticalHit) {
      for (const modifier of modifiers) {
        if (modifier.damageBonusOnCrit) {
          const expr = DiceExprModule.parse(modifier.damageBonusOnCrit);
          retval.push(...expr.eval());
          continue;
        }

        if (modifier.damageBonus) {
          const expr = DiceExprModule.parse(modifier.damageBonus);
          retval.push(...expr.eval());
          // Only the constant part is multiplied.
          for (let i = 1; i < multiplier; i++) {
            retval.push(expr.constant);
          }
        }
      }
    } else {
      for (const modifier of modifiers) {
        if (!modifier.damageBonus) continue;

        const expr = DiceExprModule.parse(modifier.damageBonus);
        retval.push(...expr.eval());
      }
    }
    return retval;
  }

  aggregateAttackModifiers() {
    let totalModAttackBonus = 0;
    let damageModifiers = [];
    for (const modifier of this.attackModifiers) {
      if (!modifier.enabled) continue;
      if (modifier.attackBonus) {
        totalModAttackBonus += Number(modifier.attackBonus);
      }

      if (modifier.damageBonus || modifier.damageBonusOnCrit) {
        damageModifiers.push(modifier);
      }
    }

    if (this.quickModifier.attackBonus !== 0 || this.quickModifier.damageBonus !== 0) {
      totalModAttackBonus += this.quickModifier.attackBonus;
      damageModifiers.push({
        id: -1,
        damageBonus: this.quickModifier.damageBonus.toString(),
      });
    }
    return {totalModAttackBonus, damageModifiers};
  }

  rollAttack(attack: Attack) {
    console.log('attack with: ', attack);

    const critThreshold = Number(attack.critThreshold!) || 20;

    if (!attack.attack) attack.attack = "0";
    const attackBonusList = attack.attack.split('/');
    console.log(attackBonusList);

    const d20 = DiceExprModule.parse('d20');

    const attackResultList: AttackResult[] = [];

    const {totalModAttackBonus, damageModifiers} = this.aggregateAttackModifiers();

    for (const attackBonus of attackBonusList) {
      const attackRoll = d20.eval()[0];

      const attackTotal = attackRoll + Number(attackBonus) + totalModAttackBonus;
      let damageEvalResult: number[] = [];
      let attackMessage;

      if (attackRoll === 1) {
        // natural 1
        console.log(`Natural 1! (${attackRoll})`);
        attackMessage = 'Natural 1';
      } else if (attackRoll >= critThreshold) {
        // critical hit
        console.log(`critical hit! (${attackRoll})`);
        damageEvalResult = this.rollDamage(attack, true, damageModifiers);
        attackMessage = 'Crit. Hit';
      } else {
        // normal
        console.log(`attack roll: ${attackTotal} (${attackRoll})`);
        damageEvalResult = this.rollDamage(attack, false, damageModifiers);
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

  showAttackResultDialog(attackResultList: AttackResult[] | null = null) {
    if (attackResultList) {
      this.lastAttackResultList = attackResultList;
    }
    this.dialog.open(AttackResultDialog, { data: this.lastAttackResultList });
  }

  addAttack() {
    // let's use current time (ms since epoch) as uuid.
    this.attacks.push(
      {id: (new Date()).getTime()}
    );
  }

  addAttackModifier() {
    this.attackModifiers.push(
      {id: (new Date()).getTime()}
    );
  }

  deleteAttack(attack: Attack) {
    while (true) {
      const idx = this.attacks.findIndex(x => x.id === attack.id);
      if (idx === -1) break;
      this.attacks.splice(idx, 1);
    }
  }

  deleteAttackModifier(attackModifier: AttackModifier) {
    while (true) {
      const idx = this.attackModifiers.findIndex(x => x.id === attackModifier.id);
      if (idx === -1) break;
      this.attackModifiers.splice(idx, 1);
    }
  }

  changeQuickModifier(key: 'attackBonus' | 'damageBonus', delta: number) {
    this.quickModifier[key] += delta;
  }
}

@Component({
  selector: 'attack-result-dialog',
  templateUrl: './attack-result-dialog.html',
})
export class AttackResultDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AttackResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AttackResult[]) {}

  ngOnInit() {}

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }
}
