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

export function AttackExprValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return null;
  };
}
