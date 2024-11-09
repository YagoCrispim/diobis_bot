import axios from 'axios';
import { Job } from '../../../domain';
import { JobsFormatter } from './helpers/jobs'; //? Maybe commom?
import { GithubResponse } from './types/gh.response';

import jobsMock from '../../../mocks/github-response.json';

interface ObjectParam {
  [key: string]: string;
}

export class GithubCrawler {
  async getJobs(repos: ObjectParam, lastSync: string): Promise<Job[]> {
    const jobs: Job[] = [];

    for (const repo in repos) {
      try {
        const repoUrl = repos[repo];

        //? TODO: Add logs sys
        // eslint-disable-next-line no-console
        console.log(`Buscando jobs do repo ${repo}`);

        const rawJobs = await this.requestJobs(repoUrl);

        if (rawJobs) {
          const newJobs: GithubResponse[] = this.getNewerJobs(
            rawJobs,
            lastSync
          ).filter((job) => !!job);
          const jobsEntities = new JobsFormatter().mapToEntity(newJobs, repo);
          jobs.push(...jobsEntities);
        }
      } catch (error) {
        global.$diobis.errorHandler(error);
      }
    }

    return jobs;
  }

  private async requestJobs(repoLink: string): Promise<GithubResponse[]> {
    if (global.$diobis.env.LOAD_LOCAL_DATA) {
      // @ts-ignore
      return jobsMock;
    }

    const session = axios.create();
    const GH_ACCESS_TOKEN = global.$diobis.env.GH_ACCESS_TOKEN;
    const headers = { Authorization: `token ${GH_ACCESS_TOKEN}` };
    const res = await session.get(repoLink, { headers });

    return res.status === 200 ? res.data : null;
  }

  private getNewerJobs(jsonJobs: any, lastSync: string): GithubResponse[] {
    return jsonJobs.map((job: any) => {
      if (!!job && job['updated_at'] > lastSync) return job;
    });
  }
}
