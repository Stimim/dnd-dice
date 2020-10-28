import { Component, OnInit, Input } from '@angular/core';

import { Attack } from '../data-type/attack';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  panelOpenState = false;
  onDiceClicked = () => {};
  onDeleteClicked = () => {};

  @Input()
  attack! : Attack;

  constructor() { }

  ngOnInit(): void {
  }

}
