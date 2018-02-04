import * as React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer';
import App from './App';

declare var module: { hot: any };

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}