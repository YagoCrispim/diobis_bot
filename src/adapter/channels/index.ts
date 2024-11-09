// from typing import List

import { MediaRepository, Job } from '../../domain';
import { Result } from '../../domain/port/media-repository';
import { channelsRegister } from './channels-register';

export class Publisher implements MediaRepository {
  async publish(jobs: Job[]): Promise<Result> {
    const res = await Promise.all(
      channelsRegister.map(async (channel) => {
        const instance = new channel();
        const re = await instance.publish(jobs);
        return re;
      })
    );

    return res[0];
  }
}
