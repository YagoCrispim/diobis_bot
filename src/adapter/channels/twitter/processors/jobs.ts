import { Job } from '../../../../domain';
import { jobTwitterTemplate } from '../templates/job_template';
import { getHashtags } from './hashtags';

export class TwitterJobsFormatter {
  format(jobs: Job[]): string[] {
    const posts: string[] = [];

    jobs.forEach((job, idx: number) => {
      const hashtags = getHashtags(job);

      let description = jobTwitterTemplate
        .replace('$hashtags', hashtags)
        .replace('$repo', job.repo)
        .replace('$date', job.createdAt)
        .replace('$labels', job.labels)
        .replace('$description', job.description)
        .replace('$url', job.link);

      if (idx >= global.$diobis.env.MAX_HASHTAGS) {
        description = description.replace(/#bolhadev /gm, '');
      }

      posts.push(description);
    });

    return posts;
  }
}
