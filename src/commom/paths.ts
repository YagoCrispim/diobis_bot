import { dirname } from 'path';

const currentDir = dirname(__filename);
const workingDir = dirname(dirname(currentDir));

export const projFiles = {
  root: workingDir,
  lastSync: `${workingDir}/lastSync`,
};
