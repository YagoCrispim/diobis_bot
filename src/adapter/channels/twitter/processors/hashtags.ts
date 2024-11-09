import { Job } from '../../../../domain';
import { languages as langsAndTools } from './languages';

const getHashtagFromRepoName = (job: Job): string | undefined => {
  //? REVIEW: Is this the best strategy?
  if (job.repo === 'reactbr') {
    return '#react';
  }

  if (job.repo === 'qabr') {
    return '#qa';
  }

  if (job.repo === 'devopsbr') {
    return '#devops';
  }

  if (job.repo === 'datasciencebr') {
    return '#datascience';
  }
};

const getHashtagFromLabels = (job: Job): string | undefined => {
  const label = job.labels.toLowerCase().replace(' ', '');

  for (const lang of langsAndTools) {
    if (label.includes(lang)) {
      return `#${lang}`;
    }
  }
};

export const getHashtags = (job: Job): string => {
  return getHashtagFromRepoName(job) || getHashtagFromLabels(job) || '';
};
