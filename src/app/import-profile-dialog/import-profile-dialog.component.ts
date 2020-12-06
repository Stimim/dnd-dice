import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Profile } from '../data-type/profile';

@Component({
  selector: 'app-import-profile-dialog',
  templateUrl: './import-profile-dialog.component.html',
  styleUrls: ['./import-profile-dialog.component.css']
})
export class ImportProfileDialogComponent implements OnInit {

  formGroup!: FormGroup;

  content: string = '';
  errorMessage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ImportProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      content: new FormControl(),
    });

    this.formGroup.controls['content'].valueChanges.subscribe(
      (v) => {this.content = v;}
    );
  }

  onOkClicked() {
    try {
      const o = JSON.parse(this.content);

      let { id, attacks, attackModifiers } = o;

      if (id === undefined) {
        this.errorMessage = 'id is not defined';
        return;
      }

      if (attacks === undefined) {
        attacks = [];
      }

      if (attackModifiers === undefined) {
        attackModifiers = [];
      }

      let profile: Profile = {
        id: id,
        attacks: attacks,
        attackModifiers: attackModifiers,
      };
      this.dialogRef.close(profile);
    } catch(error) {
      this.errorMessage = error;
      console.error(error);
      return;
    }
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
