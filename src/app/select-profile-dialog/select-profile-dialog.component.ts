import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface Element {
  name: string;
};

@Component({
  selector: 'app-select-profile-dialog',
  templateUrl: './select-profile-dialog.component.html',
  styleUrls: ['./select-profile-dialog.component.css']
})
export class SelectProfileDialogComponent implements OnInit {

  profileIds: string[];

  dataSource: MatTableDataSource<Element>;
  displayedColumns = [ 'name' ];

  constructor(
    private dialogRef: MatDialogRef<SelectProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.profileIds = data;

    const elements: Element[] = this.profileIds.map((value) => {
      return {name: value};
    });

    this.dataSource = new MatTableDataSource(elements);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
