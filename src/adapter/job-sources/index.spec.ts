import { JobCrawler } from '.';
import { GitHubChannel } from './github/github';

describe('JobCrawler', () => {
  global.$diobis = {
    env: {} as any,
    errorHandler: jest.fn(),
  };

  it('should be defined', () => {
    expect(JobCrawler).toBeDefined();
  });

  describe('Get', () => {
    it('should be defined', () => {
      expect(JobCrawler.prototype.get).toBeDefined();
    });

    it('should call "get" in registered channels', async () => {
      // @ts-ignore
      JobCrawler.prototype.jobSources = [GitHubChannel];
      // @ts-ignore
      GitHubChannel.prototype.get = jest.fn();

      const jobCrawler = new JobCrawler();
      await jobCrawler.get();

      expect(GitHubChannel.prototype.get).toHaveBeenCalled();
    });
  });
});
