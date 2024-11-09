import { GitHubChannel } from './github';
import { GithubCrawler } from './crawler';

describe('GitHubChannel', () => {
  global.$diobis = {
    env: {} as any,
    errorHandler: jest.fn(),
  };

  it('should be defined', () => {
    expect(GitHubChannel).toBeDefined();
  });

  it('should call GithubCrawler.getJobs', async () => {
    // @ts-ignore
    GitHubChannel.prototype.GithubCrawler = GithubCrawler;
    // @ts-ignore
    GithubCrawler.prototype.getJobs = jest.fn();

    const githubChannel = new GitHubChannel();
    await githubChannel.get();

    expect(GithubCrawler.prototype.getJobs).toHaveBeenCalled();
  });
});
