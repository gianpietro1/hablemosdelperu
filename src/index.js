import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Provider as MenuProvider } from './context/MenuContext';
import { Provider as CountriesProvider } from './context/CountriesContext';
import { Provider as GovernantsProvider } from './context/GovernantsContext';

ReactDOM.render(
  <MenuProvider>
    <CountriesProvider>
      <GovernantsProvider>
        <App />
      </GovernantsProvider>
    </CountriesProvider>
  </MenuProvider>,
  document.querySelector('#root'),
);
