import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * PersistGate 
 * 
 * Using the PersistGate component, you can delay the rendering of your app until the rehydration is complete.
 *  This prevents your app from rendering with an empty state.
 * 
 * loading: A component or element displayed while the persisted state is being loaded. 
 * It provides feedback to the user during the rehydration process.
 * 
 * persistor(not object)  allows PersistGate to interact with the persistor object
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/*<UserProvider> */}
          {/* <CategoriesProvider>*/}
          {/**<CartProvider> */}
          <App />
          {/** </CartProvider>*/}
          {/*</CategoriesProvider> */}
          {/*</UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
