import { getLastSync } from '../../../commom/datetime-helper';
import { Job, JobsRepository } from '../../../domain';
import { GithubCrawler } from './crawler';
import { repos } from './resources/repos';

export class GitHubChannel extends JobsRepository {
  async get(): Promise<Job[]> {
    let jobs: Job[] = [];

    try {
      const lastSync = await getLastSync();
      jobs = await new GithubCrawler().getJobs(repos, lastSync);
    } catch (error) {
      global.$diobis.errorHandler(error);
    }

    return jobs;
  }
}
