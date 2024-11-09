import { Job } from '../entity/job';

export interface Result {
  success: number;
  failure: number;
}

export abstract class MediaRepository {
  abstract publish(jobs: Job[]): Promise<Result>;
}
