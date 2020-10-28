import 'reset-css/reset.css';
import '../styles/globals.css';
import { FC } from 'react';
import { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import { RecoilRoot } from 'recoil';
import ThemeProvider from '../components/ThemeProvider';
import config from '../config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'testApiCall',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
  ssr: true,
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
