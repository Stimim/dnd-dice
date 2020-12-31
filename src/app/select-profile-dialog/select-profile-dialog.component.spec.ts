import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfileDialogComponent } from './select-profile-dialog.component';

describe('SelectProfileDialogComponent', () => {
  let component: SelectProfileDialogComponent;
  let fixture: ComponentFixture<SelectProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProfileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
