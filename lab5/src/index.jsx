import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import Wrapper from './components/Wrapper/Wrapper';
import config from './config.js';

ReactDOM.render(
  <Auth0Provider
    domain={config['auth-domain']}
    clientId={config['auth-client-id']}
    redirectUri={config['auth-callback-uri']}
    audience={config['auth-audience']}
  >
    <Wrapper>
      <App />
    </Wrapper>
  </Auth0Provider>,
  document.getElementById('root'),
);