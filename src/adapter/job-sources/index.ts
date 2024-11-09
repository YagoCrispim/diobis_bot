import { Job, JobsRepository } from '../../domain';
import { jobSources } from './sources';

export class JobCrawler extends JobsRepository {
  async get(): Promise<Job[]> {
    const jobs = (
      await Promise.all(
        jobSources.map(async (source) => {
          const instance = new source();
          return await instance.get();
        })
      )
    ).flatMap((jobsArr) => jobsArr);

    return jobs;
  }
}
