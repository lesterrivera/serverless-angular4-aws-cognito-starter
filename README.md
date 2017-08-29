# Serverless-Angular4-AWS-Cognito-Starter

A boilerplate serverless architecture that Provides a full login flow via AWS Cognito to an Angular4 website.

This project is the built and deployed using [Serverless Framework](https://serverless.com) and the following technology stack:
- AWS Lambda 
- AWS API Gateway
- Angular 4
- Bootstrap 4

## Usage

1. Set up Serverless Framework and your AWS account as detailed [here](https://serverless.com/framework/docs/getting-started/).

2. Clone the project and initialize the stack

```
$ git clone https://github.com/lesterrivera/serverless-angular4-aws-cognito-starter.git

$ cd serverless-angular4-aws-cognito-starter

$ npm install

```

3. Deploy the AWS stack

```
$ serverless deploy
```

## Configure AWS Cognito
AWS Cognito provides an authentication framework for mobile and web applications.

1. Configure an AWS Cognito in your AWS Console as detailed [here]() 

2. Set appropriate values fpr the AWS Cognito User Pool to the following in serverless.yml.

```$yml
  devCognitoPool: ''
  prodCognitoPool: ''
```

## Update configuration of website
The sample website is built with angular 4 using bootstrap 4. When using the angular cli,
you can view the website locally rather than thru the s3 bucket that serverless framework deploys. 

1. Configure environment-specifc configuration file in __/static/src/environments/__ folder

environment.ts and environment.prod.ts
```javascript
export const environment = {
  production: false,

  region: '',  // AWS Region
  identityPoolId: '', // Identity PoolID from AWS Cognito
  userPoolId: '',  // User Pool ID from AWS Cognito
  clientId: '',  // Client ID for the User Pool in AWS Cognito

  apiURL: '' // Base URL for the backend API
};
```

2. Create a production build of the website:
```bash

$ cd static

$ npm install

$ ng build --prod

$ cd ..

```

## Synchronize contents to your S3 bucket
You can deploy the front-end website to your S3 buckets without deploying the serverless architecture as follows:

```
$ serverless syncToS3
```

However, deploying the serverless architecture again also works well and does not affect the already-deployed components.

1. Deploy the AWS stack

```
$ serverless deploy
```

2. Use web browser to open the front-end website on your S3 bucket

## Cleanup
If you wish to remove the AWS infrastructure created as a part of this project, use the following command to do so. 
This will remove the IAM roles, any resources defined in serverless.yml, and destroy the CloudFormation stack.

```
$ serverless deleteFromS3

$ serverless remove

Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
..................................
Serverless: Stack removal finished...
```
