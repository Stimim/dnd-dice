import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackModifierComponent } from './attack-modifier.component';

describe('AttackModifierComponent', () => {
  let component: AttackModifierComponent;
  let fixture: ComponentFixture<AttackModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
