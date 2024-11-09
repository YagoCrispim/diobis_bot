/* eslint-disable no-console */
// @ts-nocheck
/**
 * Load enviroment variables from .env file to global object.
 */
function enviroment() {
  const envVariables = [
    'PROD',
    'PORT',
    'ALLOW_UPDATE_SYNC',
    'API_KEY',
    'API_SECRET_KEY',
    'ACCES_TOKEN',
    'ACCES_TOKEN_SECRET',
    'GH_ACCESS_TOKEN',
    'LOAD_LOCAL_DATA',
    'ALLOW_PUBLISH',
    'MAX_HASHTAGS',
  ];

  envVariables.forEach((envVariable) => {
    let value = process.env[envVariable];

    if (value?.includes('type')) {
      const type = value.split(':')[1];
      const finalValue = value.split(':')[2];

      switch (type) {
        case 'number':
          value = Number(finalValue);
          break;
        case 'boolean':
          value = finalValue === 'true' ? true : false;
          break;
        default:
          value = finalValue;
          break;
      }
    }

    global.$diobis.env[envVariable] = value;
  });
}

/**
 * Load a global error handler.
 *
 * Prints the error message and the file / line where the error was thrown.
 */
function errorHandler() {
  const handler = (msg: string | unknown) => {
    const stack = new Error().stack?.split('at ')[2].trim().split(' ');

    stack?.forEach((el) => {
      if (el.includes('/src')) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        errorLogger(msg, el.split('src/')[1]);
        return;
      }
    });
  };

  const errorLogger = (message: string | any, caller: string) => {
    console.log('\n---------- [ERROR] ----------');
    console.log(`File: src/${caller} \nMessage: ${message}`);
    console.log('-----------------------------\n');
  };

  global.$diobis.errorHandler = handler;
}

/**
 * Load all global functions registered.
 */
export function globalLoader() {
  global.$diobis = {
    env: {},
  };

  const globalLoaders = [enviroment, errorHandler];

  globalLoaders.forEach((loader) => {
    loader();
  });
}
