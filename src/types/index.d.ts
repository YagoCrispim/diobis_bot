/**
 * Add types for all elements injected in the global scope
 */
interface GlobalEnv {
  PROD: boolean;
  ALLOW_UPDATE_SYNC: boolean;
  API_KEY: string;
  API_SECRET_KEY: string;
  ACCES_TOKEN: string;
  ACCES_TOKEN_SECRET: string;
  GH_ACCESS_TOKEN: string;
  MAX_HASHTAGS: number;
  PORT: number;
  LOAD_LOCAL_DATA: boolean;
  ALLOW_PUBLISH: boolean;
}

interface GlobalDiobis {
  env: GlobalEnv;
  errorHandler: (message: string | any) => void;
}

declare global {
  // eslint-disable-next-line no-var
  var $diobis: GlobalDiobis;
}

export {};
