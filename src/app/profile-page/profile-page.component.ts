import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProfileService } from '../profile.service';
import { Profile } from '../data-type/profile';

import { ImportProfileDialogComponent } from '../import-profile-dialog/import-profile-dialog.component';
import { SelectProfileDialogComponent } from '../select-profile-dialog/select-profile-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  activeProfile!: Profile;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog) {
    this.profileService.profileChanged.subscribe(
      (newProfile: Profile) => {
        this.activeProfile = newProfile;
      }
    );
  }

  ngOnInit(): void {
    this.activeProfile = this.profileService.getActiveProfile();
  }

  saveProfile(profileId: string) {
    if (profileId) {
      this.activeProfile.id = profileId;
    }
    this.profileService.saveActiveProfile();
  }

  importProfile() {
    const dialogRef = this.dialog.open(ImportProfileDialogComponent, {
      width: '80%',
      // height: '30em',
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.activeProfile = result;
          this.profileService.activeProfile = result;
        }
      }
    );
  }

  loadProfile() {
    this._selectProfile().then( (result) => {
      this.profileService.loadProfile(result);
    });
  }

  deleteProfile() {
    this._selectProfile().then( (result) => {
      this.profileService.deleteProfile(result);
    });
  }

  _selectProfile() {
    return new Promise<string>( (resolve) => {
      const profileIds = this.profileService.getAllProfileIds();

      const dialogRef = this.dialog.open(
        SelectProfileDialogComponent, {
          data: profileIds,
        });

        dialogRef.afterClosed().subscribe(result => resolve(result));
    });
  }
}
