# Auth With AWS Cognito without amplify init

This project I used Nextjs to the frontend and Serverless Framework with javascript to the backend.

The main issue here is that aws amplify is not capable of using cookie to store tokens which is a big downside.

## how to run

### Backend

I didn't use any way to test it locally. But you can use the `serverless.yml` file to deploy to different environments like:

`sls deploy --stage=dev`

or

`sls deploy --stage=prd`

The default stage is `dev`. After you run this command you need to access the aws console to get the variables to configure your AWS Amplify on the frontend.

### Frontend

To run the front end just run `yarn install` to install all dependencies and next run `yarn dev` to run on dev environment.

To deploy the frontend you only need to configure you Serverless environment and after run `sls`. To add other configurations read the docs about serverless-component.

```
service: auth-front-back

myNextApplication:
  component: '@sls-next/serverless-component@1.18.0-alpha.19'
```