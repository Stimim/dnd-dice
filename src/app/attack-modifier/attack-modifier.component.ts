import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AttackExprValidator, DiceExprValidator } from '../app-validators';
import { AttackModifier } from '../data-type/attack';

@Component({
  selector: 'app-attack-modifier',
  templateUrl: './attack-modifier.component.html',
  styleUrls: ['./attack-modifier.component.css']
})
export class AttackModifierComponent implements OnInit {

  @Input()
  attackModifier!: AttackModifier;

  @Output()
  deleteRequest = new EventEmitter<AttackModifier>();

  attackModifierForm!: FormGroup;

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
    this.attackModifierForm = new FormGroup({
      enabled: new FormControl(this.attackModifier.enabled),
      name: new FormControl(this.attackModifier.name),
      attackBonus: new FormControl(
        this.attackModifier.attackBonus,
        [AttackExprValidator(false)]),
      damageBonus: new FormControl(
        this.attackModifier.damageBonus,
        [DiceExprValidator()]),
      damageBonusOnCrit: new FormControl(
        this.attackModifier.damageBonusOnCrit,
        [DiceExprValidator()]),
    });

    const model: any = this.attackModifier;
    for (const key of Object.keys(this.attackModifierForm.controls)) {
      this.attackModifierForm.controls[key].valueChanges.subscribe(
        (v) => {model[key] = v;}
      );
    }
  }

  makeTitle() {
    const name = this.attackModifier.name || "NoName";

    const extra = [];
    if (this.attackModifier.attackBonus) {
      extra.push(this.attackModifier.attackBonus);
    }

    if (this.attackModifier.damageBonus) {
      extra.push(this.attackModifier.damageBonus);
    }

    if (this.attackModifier.damageBonusOnCrit) {
      extra.push(this.attackModifier.damageBonusOnCrit);
    }

    if (extra.length > 0) {
      return `${name}: ${extra.join(' | ')}`;
    }
    return `${name}`;
  }

  onCheckboxClicked(event: any) {
    event.stopPropagation();
    return;
  }

  onDeleteClicked(event: any) {
    event.stopPropagation();

    this.deleteRequest.emit(this.attackModifier);
  }
}
