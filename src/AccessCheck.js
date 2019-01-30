import React from 'react';
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo';
import { getKey } from './graphql/Queries'
import debug from './debug'

const AccessCheck = ({licence}) => (
    <Query query={getKey} variables={{ id: licence }}>
        {({ loading, error, data }) => {
            if (error) return <div>Error {error}</div>;
            if (loading || !data) return <div> Loading </div>;
            if (data.getKey) {
              localStorage.setItem("mg", debug(data.getKey.owner,'AccessCheck'));
            } else {
              localStorage.removeItem("mg");
            }
            return <Redirect to="/"/>;
        }}
    </Query>
)

export default AccessCheck;
