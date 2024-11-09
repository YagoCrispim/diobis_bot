import { Job } from '../../../../domain';
import { GithubResponse } from '../types/gh.response';

export class JobsFormatter {
  mapToEntity(jobs: GithubResponse[], repo: string): Job[] {
    return jobs.map((rawJob: any) => {
      const description = this.getJobDescription(rawJob);
      const labels = this.getJobLabels(rawJob.labels);
      const date = this.getJobDates(rawJob);
      const url = rawJob.html_url;

      return new Job(repo, description, labels, url, date);
    });
  }

  private getJobLabels(labels: GithubResponse['labels']): string {
    let jobLabels = '';

    for (const label of labels.slice(0, 3)) {
      jobLabels += `${label.name}$`;
    }

    return jobLabels.replace(/\$/g, ' - ').slice(0, -3) || '';
  }

  private getJobDates(job: GithubResponse): string {
    const date = job.updated_at.split('T')[0].split('-');
    return date.reverse().join('/');
  }

  private getJobDescription(job: GithubResponse): string {
    const description = job.body.replace(/<[^>]*>|##|\r/g, '');
    return `${description.slice(0, 90)}...`.trim();
  }
}
