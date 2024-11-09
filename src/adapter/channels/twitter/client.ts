import { TwitterApi } from 'twitter-api-v2';
import { Result } from '../../../domain';

export class TwitterClient {
  private client: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: global.$diobis.env.API_KEY,
      appSecret: global.$diobis.env.API_SECRET_KEY,
      accessToken: global.$diobis.env.ACCES_TOKEN,
      accessSecret: global.$diobis.env.ACCES_TOKEN_SECRET,
    });
  }

  async postJob(jobs: string[]): Promise<Result> {
    return global.$diobis.env.ALLOW_PUBLISH
      ? await this.publishJobs(jobs)
      : await this.logResult(jobs);
  }

  private async publishJobs(jobs: string[]): Promise<Result> {
    const promisesResult = await Promise.allSettled(
      jobs.map(async (job) => (await this.client.v2.tweet(job)).errors)
    );

    const result = { success: 0, failure: 0 };

    promisesResult.forEach((re) => {
      re.status === 'rejected' ? ++result.failure : ++result.success;
    });

    return result;
  }

  private async logResult(jobs: string[]): Promise<Result> {
    jobs.forEach((job) => console.log(job));
    return { success: 0, failure: 0 };
  }
}
