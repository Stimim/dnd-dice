import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProfileDialogComponent } from './import-profile-dialog.component';

describe('ImportProfileDialogComponent', () => {
  let component: ImportProfileDialogComponent;
  let fixture: ComponentFixture<ImportProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportProfileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
