import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingScreen from './LoadingScreen';
import uuidV4 from 'uuid/v4'
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import appSyncConfig from './config/AppSync';
import debug from './debug'

//import registerServiceWorker from './registerServiceWorker';

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  },
  disableOffline: true
},
{
  shouldBatch: true
});

console.log('BUM');

if(localStorage.getItem('me')===null)
  localStorage.setItem('me',uuidV4())

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated render={({ rehydrated }) => (
      rehydrated ? <App /> : <LoadingScreen />
    )} />
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
//registerServiceWorker();
