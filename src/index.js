import React from 'react';
import ReactDOM from 'react-dom';
import {createNetworkStatusNotifier} from 'react-apollo-network-status';
import {createHttpLink} from 'apollo-link-http';
import App from './App';
import LoadingScreen from './LoadingScreen';
import uuidV4 from 'uuid/v4'
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import appSyncConfig from './config/AppSync';
import NetworkStatus from './components/NetworkStatus'
//import debug from './debug'

//import registerServiceWorker from './registerServiceWorker';
const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink
} = createNetworkStatusNotifier();

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  },
  disableOffline: false
},
{
  shouldBatch: false,
  link: networkStatusNotifierLink.concat(
    createAppSyncLink({
      url: appSyncConfig.graphqlEndpoint,
      region: appSyncConfig.region,
      auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
      }
    })
  )
});

if(localStorage.getItem('me')===null)
  localStorage.setItem('me',uuidV4())

const WithProvider = () => (
  <ApolloProvider client={client}>
    <div>
      <Rehydrated render={({ rehydrated }) => (
        rehydrated ?<App />: <LoadingScreen />
      )} />
      <NetworkStatusNotifier render={({loading, error}) => (
        <NetworkStatus loading={loading} error={error} />
      )} />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
//registerServiceWorker();
