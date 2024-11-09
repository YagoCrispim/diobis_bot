import { MediaRepository, Job, Result } from '../../domain';

export class PostJobsUseCase {
  constructor(private interactor: MediaRepository) {}

  async execute(jobs: Job[]): Promise<Result | undefined> {
    try {
      return this.interactor.publish(jobs);
    } catch (error) {
      global.$diobis.errorHandler(error);
    }
  }
}
