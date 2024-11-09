import express, { Request, Response } from 'express';

import { getLastSync, updateLastSync } from '../../../commom/datetime-helper';
import { JobController } from './job.controller';

const app = express();
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.json({ message: "I'm ok!" });
});

app.get('/jobs', (_req: Request, res: Response) => {
  const jobsController = new JobController();
  jobsController
    .getAndPostJobs()
    .then((result) => updateLastSync().then(() => result))
    .then((result) => res.json(result));
});

app.get('/last_sync', (_: Request, res: Response) => {
  getLastSync()
    .then((ts) => {
      if (!ts) {
        updateLastSync().then((timestamp) => res.json({ lastSync: timestamp }));
        return;
      }

      res.json({ lastSync: ts });
    })
    .catch((error) => {
      global.$diobis.errorHandler(error);
      res.json({ error: 'Error on get last sync' });
    });
});

export const run = () =>
  app.listen(global.$diobis.env.PORT, () =>
    //? TODO: Add logs sys
    // eslint-disable-next-line no-console
    console.log('Server is running on port', global.$diobis.env.PORT)
  );
