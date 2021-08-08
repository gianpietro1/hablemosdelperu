import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Provider as MenuProvider } from './context/MenuContext';

ReactDOM.render(
  <MenuProvider>
    <App />
  </MenuProvider>,
  document.querySelector('#root'),
);
