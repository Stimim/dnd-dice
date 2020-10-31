import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AttackExprValidator, DiceExprValidator } from '../app-validators';
import { Attack } from '../data-type/attack';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  @Input()
  attack! : Attack;

  @Output()
  deleteRequest = new EventEmitter<Attack>();

  @Output()
  rollRequest = new EventEmitter<Attack>();

  panelOpenState = false;

  attackForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.attackForm = new FormGroup({
      name: new FormControl(this.attack.name),
      attack: new FormControl(
        this.attack.attack,
        [AttackExprValidator()]),
      damage: new FormControl(
        this.attack.damage,
        [DiceExprValidator()]),
      crit_threshold: new FormControl(
        this.attack.crit_threshold,
        [Validators.min(1), Validators.max(20)]),
      crit_multiplier: new FormControl(
        this.attack.crit_multiplier,
        [Validators.min(1)]),
    });

    const model: any = this.attack;
    for (const key of Object.keys(this.attackForm.controls)) {
      this.attackForm.controls[key].valueChanges.subscribe(
        (v) => {model[key] = v;}
      );
    }
  }

  onDiceClicked(event: any) {
    event.stopPropagation();
    this.rollRequest.emit(this.attack);
  }

  onDeleteClicked(event: any) {
    event.stopPropagation();
    this.deleteRequest.emit(this.attack);
  }

}
