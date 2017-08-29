// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  region: '',  // AWS Region
  identityPoolId: '', // Identity PoolID from AWS Cognito
  userPoolId: '',  // User Pool ID from AWS Cognito
  clientId: '',  // Client ID for the User Pool in AWS Cognito

  apiURL: '' // Base URL for the backend API
};


