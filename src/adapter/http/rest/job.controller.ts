import { GetJobsUseCase, PostJobsUseCase } from '../../../app-usecases';
import { Job } from '../../../domain';
import { Publisher } from '../../channels';
import { JobCrawler } from '../../job-sources';

export class JobController {
  async getAndPostJobs() {
    const jobCrawler = new JobCrawler();
    const getJobsUsecase = new GetJobsUseCase(jobCrawler);

    const jobsPublisher = new Publisher();
    const postJobsUsecase = new PostJobsUseCase(jobsPublisher);

    const jobs: Job[] = await getJobsUsecase.execute();
    const result = await postJobsUsecase.execute(jobs);

    return result;
  }
}
