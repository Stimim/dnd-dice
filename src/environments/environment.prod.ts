import { VERSION } from './version';

export const environment = {
  production: true,
  version: VERSION.version,
  commit: VERSION.commit,
  timestamp: (new Date(VERSION.timestamp)).toLocaleString(),
};
