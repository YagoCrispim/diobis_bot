import { projFiles } from './paths';

describe('Paths', () => {
  it('should be defined', () => {
    expect(projFiles).toBeDefined();
  });

  describe('Routes', () => {
    it('should have a root route', () => {
      expect(projFiles.root).toBeDefined();
    });

    it('should have a lastSync route', () => {
      expect(projFiles.lastSync).toBeDefined();
    });
  });
});
