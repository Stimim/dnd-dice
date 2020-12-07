import { VERSION } from './version';

export const environment = {
  production: false,
  version: VERSION.version + '-dev',
  commit: VERSION.commit + '-dev',
  timestamp: (new Date(VERSION.timestamp)).toLocaleString(),
};
