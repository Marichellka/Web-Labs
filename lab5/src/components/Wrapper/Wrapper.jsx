import React, { useState, useEffect } from 'react';;
import { useAuth0 } from '@auth0/auth0-react';
import { setContext } from '@apollo/link-context';
import {ApolloProvider, concat, ApolloClient, InMemoryCache} 
from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import config from '../../config.js';

function Wrapper({children}){
    const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [bearerToken, setBearerToken] = useState();

    useEffect(() => {
       const getToken = async () => {
            try{
                const token = isAuthenticated ? await getAccessTokenSilently() : '';
                setBearerToken(token);
            } catch{
                loginWithRedirect();
            }
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    const authLink = setContext((_, { headers }) => {
        if (!bearerToken) return { headers };

        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${bearerToken}`,
            },
        };
    });

    const wsLink = new WebSocketLink({
        uri: config['address'],
        options: {
        reconnect: true,
        connectionParams: () => ({
            headers: {
            Authorization: `Bearer ${bearerToken}`,
            },
        }),
        },
    });

    const client = new ApolloClient({
        link: concat(authLink, wsLink),
        cache: new InMemoryCache({
        typePolicies: {
            Subscription: {
            fields: {
                todos: {
                merge: false,
                },
            },
            },
        },
        }),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Wrapper;
