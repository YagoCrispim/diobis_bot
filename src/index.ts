import * as dotenv from 'dotenv';
dotenv.config();

import { run } from './adapter/http/rest/api';
import { globalLoader } from './global-loader';

globalLoader();

if (!global.$diobis.env.PROD) {
  console.log('-----------"GLOBAL ENV"-----------');
  console.log(global.$diobis);
  console.log('------------------------');
}

run();
