import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';

import Route from './src/router/route';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
