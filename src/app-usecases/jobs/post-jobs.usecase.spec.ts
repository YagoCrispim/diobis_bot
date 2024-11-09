import { Job, MediaRepository } from '../../domain';
import { PostJobsUseCase } from './post-jobs.usecase';

describe('GetJobsUseCase', () => {
  const mediaRepository: MediaRepository = {
    publish: jest.fn(),
  };

  const jobMock: Job[] = [
    {
      description: 'description',
      createdAt: 'createdAt',
      labels: 'label',
      link: 'link',
      repo: 'repo',
    },
  ];

  it('should be defined', () => {
    expect(new PostJobsUseCase(mediaRepository)).toBeDefined();
  });

  it('should call interactor.publish', async () => {
    const usecase = new PostJobsUseCase(mediaRepository);
    await usecase.execute(jobMock);
    expect(mediaRepository.publish).toHaveBeenCalled();
    expect(mediaRepository.publish).toHaveBeenCalledWith(jobMock);
  });
});
