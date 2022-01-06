import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import Wrapper from './components/Wrapper/Wrapper';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH_DOMAIN}
    clientId={process.env.AUTH_CLIENT_ID}
    redirectUri={process.env.AUTH_CALLBACK_URI}
    audience={process.env.AUTH_AUDIENCE}
  >
    <Wrapper>
      <App />
    </Wrapper>
  </Auth0Provider>,
  document.getElementById('root'),
);