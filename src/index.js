import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import './index.scss';
import allReducers from './components/reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(  <Provider store={store}>
  <App />
</Provider>,);