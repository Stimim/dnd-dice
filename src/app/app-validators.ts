import { AbstractControl, ValidatorFn } from '@angular/forms';

import { parseDiceExpr } from './data-type/dice-expr-grammar';

export function DiceExprValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value || control.value === '') return null;
    try {
      parseDiceExpr(control.value);
      return null;
    } catch(error) {
      return {diceExpr: error}
    }
  };
}

function validateOneAttack(expr : string) {
  const v = Number(expr);
  return Number.isSafeInteger(v);
}

export function AttackExprValidator(allowMultipleAttack = true): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value || control.value === '') return null;

    if (allowMultipleAttack) {
      const attacks = control.value.split('/');
      for (const attack of attacks) {
        if (!validateOneAttack(attack)) {
          return {attackExpr: `invalide attack: ${attack}`};
        }
      }
    } else {
      if (!validateOneAttack(control.value)) {
        return {attackExpr: `invalide attack: ${control.value}`};
      }
    }
    return null;
  };
}
