import { Component, OnInit } from '@angular/core';

import { Attack } from '../data-type/attack';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.css']
})
export class CombatPageComponent implements OnInit {

  attacks : Attack[] = [ ];

  constructor() { }

  ngOnInit(): void {
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
