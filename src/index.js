import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingScreen from './LoadingScreen';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import appSyncConfig from './appsync';

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  }
},
{
  shouldBatch: true
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated render={({ rehydrated }) => (
      rehydrated ? <App /> : <LoadingScreen />
    )} />
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
