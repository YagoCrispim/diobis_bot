import { Job } from './job';

describe('Job', () => {
  it('should be defined', () => {
    expect(Job).toBeDefined();
  });

  describe('Constructor', () => {
    it('should create a new job', () => {
      const job = new Job('repo', 'description', 'labels', 'link', 'createdAt');

      expect(job).toBeDefined();
    });

    it('should create a new job with the correct properties', () => {
      const job = new Job('repo', 'description', 'labels', 'link', 'createdAt');

      expect(job.repo).toBe('repo');
      expect(job.description).toBe('description');
      expect(job.labels).toBe('labels');
      expect(job.link).toBe('link');
      expect(job.createdAt).toBe('createdAt');
    });
  });
});
