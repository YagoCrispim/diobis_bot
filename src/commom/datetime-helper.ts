import fs from 'fs/promises';

import { projFiles } from './paths';

/**
 * @description
 * This function returns a timestamp.
 *
 * Timestamp example: 2021-08-01T00:00:00.000Z
 */
export const getTimestamp = (): string => {
  const now = new Date().toLocaleString();
  const brTimezone = 3;

  return new Date(
    new Date(now).setHours(new Date(now).getHours() - brTimezone)
  ).toISOString();
};

/**
 * @description
 * Responsible for get the last sync timestamp.
 */
export const getLastSync = async () => {
  const lastSyncFile = projFiles.lastSync;

  try {
    const content = await fs.readFile(lastSyncFile, 'utf8');
    return content;
  } catch (_) {
    global.$diobis.errorHandler('Error reading lastSync file');
    return '';
  }
};

/**
 * @description
 * Responsible for updating the lastSync using the current timestamp.
 */
export const updateLastSync = async () => {
  if (!global.$diobis.env.ALLOW_UPDATE_SYNC) return;

  const lastSyncFile = projFiles.lastSync;
  const currentTimestamp = getTimestamp();

  try {
    const ts = await fs.writeFile(lastSyncFile, currentTimestamp);
    return ts;
  } catch (_) {
    throw new Error('Error updating lastSync file');
  }
};
