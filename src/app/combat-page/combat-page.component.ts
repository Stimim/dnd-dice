import { Component, OnInit } from '@angular/core';

import { Attack } from '../data-type/attack';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.css']
})
export class CombatPageComponent implements OnInit {

  attacks : Attack[] = [
    {}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
