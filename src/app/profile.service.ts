import { Injectable } from '@angular/core';
import * as StoreModule from 'store2';

import { Profile } from './data-type/profile';

const KEY_ACTIVE_ID = 'active-id';
const PROFILE_STORE = StoreModule.namespace('profile');
const META_STORE = StoreModule.namespace('meta');

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  activeProfile: Profile;

  constructor() {
    this.activeProfile = this._loadDefaultProfile();
  }

  getActiveProfile(): Profile {
    return this.activeProfile;
  }

  _generateId(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = `0${now.getMonth() + 1}`.slice(-2);
    const date = `0${now.getDate()}`.slice(-2);

    return `${year}-${month}-${date}`;
  }

  _loadDefaultProfile(): Profile {
    let loaded: any = {};
    if (META_STORE.has(KEY_ACTIVE_ID)) {
      const activeId = META_STORE.get(KEY_ACTIVE_ID);
      if (PROFILE_STORE.has(activeId)) {
        loaded = PROFILE_STORE.get(activeId);
      }
    }
    return {
      id: loaded.id || this._generateId(),
      attacks: loaded.attacks || [],
      attackModifiers: loaded.attackModifiers || [],
    };
  }

  saveActiveProfile() {
    const id = this.activeProfile.id || this._generateId();
    PROFILE_STORE.set(id, this.activeProfile);
    META_STORE.set(KEY_ACTIVE_ID, id);
  }
}
