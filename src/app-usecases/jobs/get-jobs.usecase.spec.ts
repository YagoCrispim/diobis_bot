import { JobsRepository } from '../../domain';
import { GetJobsUseCase } from './get-jobs.usecase';

describe('GetJobsUseCase', () => {
  const interactor: JobsRepository = {
    get: jest.fn(),
  };

  it('should be defined', () => {
    expect(new GetJobsUseCase(interactor)).toBeDefined();
  });

  it('should call interactor.get', async () => {
    const usecase = new GetJobsUseCase(interactor);
    await usecase.execute();
    expect(interactor.get).toHaveBeenCalled();
  });
});
