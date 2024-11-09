import { Job } from '../entity/job';

export abstract class JobsRepository {
  abstract get(): Promise<Job[]>;
}
