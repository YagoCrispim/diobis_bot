import fs from 'fs/promises';

import { getLastSync, getTimestamp, updateLastSync } from './datetime-helper';

describe('Helpers', () => {
  beforeEach(() => {
    // @ts-ignore
    global.$diobis = {
      // @ts-ignore
      env: {
        ALLOW_UPDATE_SYNC: true,
      },
    };
  });

  describe('GetTimestamp', () => {
    it('should return a timestamp', () => {
      const timestamp = getTimestamp();
      expect(timestamp).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
    });
  });

  describe('GetLastSync', () => {
    it('should call fs.readFile', () => {
      const spy = jest.spyOn(fs, 'readFile').mockImplementation(jest.fn());
      getLastSync();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('UpdateLastSync', () => {
    it('should call fs.writeFile', () => {
      const spy = jest.spyOn(fs, 'writeFile').mockImplementation(jest.fn());
      updateLastSync();
      expect(spy).toHaveBeenCalled();
    });
  });
});
