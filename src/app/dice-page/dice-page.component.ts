import { Component, OnInit } from '@angular/core';

import * as DiceExprModule from '../data-type/dice-expr';

interface ResultItem {
  exprObject: DiceExprModule.Expr;
  result: number[];
  sum: number;
};


const MAX_RESULT_LENGTH = 10;

@Component({
  selector: 'app-dice-page',
  templateUrl: './dice-page.component.html',
  styleUrls: ['./dice-page.component.css']
})
export class DicePageComponent implements OnInit {

  results : ResultItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addExpr(expr : string) {
    console.log(expr);
    const exprObject = DiceExprModule.parse(expr);
    console.log(exprObject);
    const result: number[] = exprObject.eval();
    const sum = result.reduce((a, b) => a + b);

    this.results.unshift({
      exprObject,
      result,
      sum,
    });

    if (this.results.length > MAX_RESULT_LENGTH) {
      this.results = this.results.slice(0, MAX_RESULT_LENGTH);
    }
  }

  retry(idx : number) {
    if (0 <= idx && idx < this.results.length) {
      const result = this.results[idx].exprObject.eval();
      this.results[idx].result = result;
      this.results[idx].sum = result.reduce((a, b) => a + b);
    }
  }
}
