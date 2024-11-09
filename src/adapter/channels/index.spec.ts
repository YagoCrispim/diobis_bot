import { Publisher } from '.';
import { Job } from '../../domain';
import { TwitterInteractor } from './twitter/twitter.interactor';

describe('Publisher', () => {
  const jobsMock: Job[] = [
    new Job('repo', 'description', 'labels', 'link', 'createdAt'),
  ];

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.log = () => {};

    // @ts-ignore
    global.$diobis = { env: {} };
    // @ts-ignore
    global.$diobis.env = {
      API_KEY: '',
      API_SECRET_KEY: '',
      ACCES_TOKEN: '',
      ACCES_TOKEN_SECRET: '',
    };
  });

  it('should be defined', () => {
    expect(Publisher).toBeDefined();
  });

  describe('Publish', () => {
    it('should be defined', () => {
      expect(Publisher.prototype.publish).toBeDefined();
    });

    it('should call "publish" in registered channels', async () => {
      // @ts-ignore
      Publisher.prototype.jobSources = [TwitterInteractor];

      const publisher = new Publisher();

      publisher.publish = jest.fn().mockReturnValue({ success: 1, failure: 2 });

      const res = await publisher.publish(jobsMock);

      expect(publisher.publish).toHaveBeenCalled();
      expect(res).toStrictEqual({ success: 1, failure: 2 });
    });
  });
});
