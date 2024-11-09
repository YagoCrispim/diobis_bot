/* eslint-disable @typescript-eslint/require-await */
import { GithubCrawler } from './crawler';

import { Job } from '../../../domain';

describe('GithubCrawler', () => {
  let githubCrawler: GithubCrawler;

  global.$diobis = {
    env: {
      LOAD_LOCAL_DATA: true,
    } as any,
    errorHandler: jest.fn(),
  };

  beforeAll(() => {
    // eslint-disable-next-line no-console
    // console.log = () => {};
  });

  beforeEach(async () => {
    githubCrawler = new GithubCrawler();
  });

  it('should be defined', () => {
    expect(GithubCrawler).toBeDefined();
  });

  it('should return Job[]', async () => {
    const jobs = await githubCrawler.getJobs(
      { test: 'test' },
      '2022-11-05T23:17:10.599Z'
    );

    expect(jobs).toBeInstanceOf(Array);
    expect(jobs[0]).toBeInstanceOf(Job);
  });

  // prettier-ignore
  it('should return Job with correct properties and values', async () => {
    const jobs = await githubCrawler.getJobs(
      { test: 'test' },
      '2022-11-05T23:17:10.599Z'
    );

    expect(jobs[0]).toBeInstanceOf(Job);
    expect(jobs[0].createdAt).toEqual('04/11/2023');
    expect(jobs[0].labels).toEqual('CLT - PJ - Remoto');
    expect(jobs[0].link).toEqual('https://github.com/qa-brasil/vagas/issues/1086');
    expect(jobs[0].repo).toEqual('test');
    expect(jobs[0].description.length).toEqual(92);
    expect(jobs[0].description).toEqual(
      'Nossa empresa\n' +
        '\n' +
        'Que incrível que você está aqui e tem interesse em fazer parte dos nossos ...'
    );
  });
});
