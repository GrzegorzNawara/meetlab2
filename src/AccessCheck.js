import React from 'react';
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo';
import { getKey } from './graphql/Queries'
import debug from './debug'

const AccessCheck = ({myKey}) => (
    <Query query={getKey} variables={{ id: myKey }}>
        {({ loading, error, data }) => {
            if (error) return <div>Error {error}</div>;
            if (loading || !data) return <div> Checking {myKey} </div>;
            if (data.getKey)
              localStorage.setItem("mg", data.getKey.owner);
            else
              localStorage.removeItem("mg");
            return <Redirect to="/"/>;
        }}
    </Query>
);

export default AccessCheck;
