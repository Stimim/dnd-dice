// Checkout: https://github.com/kylejlin/tyson

import { parseDiceExpr } from './dice-expr-grammar';

class Dice {
  numRoll : number;
  numFace : number;
  isPositive : boolean;

  constructor(numRoll: number, numFace: number, isPositive: boolean = true) {
    this.numRoll = numRoll;
    this.numFace = numFace;
    this.isPositive = isPositive;
  }

  roll() {
    let result : number[] = [];

    if (this.isPositive) {
      for (let i = 0; i < this.numRoll; i++) {
        result.push(Math.floor(Math.random() * this.numFace) + 1);
      }
    } else {
      for (let i = 0; i < this.numRoll; i++) {
        result.push(-(Math.floor(Math.random() * this.numFace) + 1));
      }
    }

    return result;
  }

  negate() {
    return new Dice(this.numRoll, this.numFace, !this.isPositive);
  }
}

export class Expr {
  dice : Dice[] = [];
  negDice : Dice[] = [];  // negative dice...
  constant : number = 0;

  addDice(dice : Dice) {
    this.dice.push(dice);
  }

  add(x : Expr | number) {
    if (x instanceof Expr) {
      this.dice.push(...x.dice);
      this.constant += x.constant;
    } else {
      this.constant += x;
    }
  }

  sub(x : Expr | number) {
    if (x instanceof Expr) {
      for (const dice of x.dice) {
        this.dice.push(dice.negate());
      }
      this.constant -= x.constant;
    } else {
      this.constant += x;
    }
  }

  toString() {
    let result = '';

    for (const dice of this.dice) {
      const sign = dice.isPositive ? '+' : '-';
      result += `${sign}${dice.numRoll}d${dice.numFace}`;
    }

    if (this.constant > 0) {
      result += `+${this.constant}`;
    } else if (this.constant < 0) {
      result += `-${this.constant}`;
    }

    if (result[0] == '+') {
      return result.substr(1);
    }
    return result;
  }

  eval() {
    const result = [];
    for (const dice of this.dice) {
      result.push(...dice.roll());
    }
    if (this.constant !== 0) {
      result.push(this.constant);
    }
    return result;
  }
}


export function diceExprAdd(x: Expr | number, y: Expr | number) {
  const expr = new Expr();
  expr.add(x);
  expr.add(y);
  return expr;
}

export function diceExprSub(x : Expr | number, y : Expr | number) {
  const expr = new Expr();
  expr.add(x);
  expr.sub(y);
  return expr;
}

export function diceExprMakeDice(x : number, y : number) {
  const dice = new Dice(x, y);
  const expr = new Expr();
  expr.addDice(dice);
  return expr;
}

export function parse(expr : string) {
  return parseDiceExpr(expr);
}

declare global {
  interface Window {
    diceExprAdd : Function;
    diceExprSub : Function;
    diceExprMakeDice : Function;
  }
}

// We need to expose these functions, so dice-expr-grammar.js can access them.
window.diceExprAdd = diceExprAdd;
window.diceExprSub = diceExprSub;
window.diceExprMakeDice = diceExprMakeDice;

