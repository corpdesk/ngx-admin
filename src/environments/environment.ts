/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost/cdapi/public/api/cd',
  consumerToken: 'B0B3DA99-1859-A499-90F6-1E3F69575DCD',// current company consumer
  USER_RESOURCES: 'http://localhost/user-resources',
  HOST: 'http://localhost',
  consumer: null,
  clientAppId: 2, // this client application identifies itself to the server with this id
  SOCKET_IO_PORT: 3000, // push server port
};
