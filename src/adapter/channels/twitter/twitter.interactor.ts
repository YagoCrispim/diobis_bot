import { MediaRepository, Job, Result } from '../../../domain';
import { TwitterClient } from './client';
import { TwitterJobsFormatter } from './processors/jobs';

export class TwitterInteractor implements MediaRepository {
  constructor(private readonly client = new TwitterClient()) {}

  async publish(jobs: Job[]): Promise<Result> {
    if (!jobs.length) {
      //? TODO: Add logs sys
      // eslint-disable-next-line no-console
      console.log('Nenhum job para publicar');
      return { success: 0, failure: 0 };
    }

    const format = new TwitterJobsFormatter();
    const posts = format.format(jobs);

    //? TODO: Add logs sys
    // eslint-disable-next-line no-console
    console.log('Postando jobs no Twitter...');

    return this.client.postJob(posts);
  }
}
