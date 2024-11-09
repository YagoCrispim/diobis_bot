import { Job, JobsRepository } from '../../domain';

export class GetJobsUseCase {
  constructor(private interactor: JobsRepository) {}

  async execute(): Promise<Job[]> {
    const res = await this.interactor.get();
    return res;
  }
}
