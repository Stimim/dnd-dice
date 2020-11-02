import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile.service';
import { Profile } from '../data-type/profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  activeProfile!: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.activeProfile = this.profileService.getActiveProfile();
  }

  saveProfile(profileId: string) {
    if (profileId) {
      this.activeProfile.id = profileId;
    }
    this.profileService.saveActiveProfile();
  }
}
