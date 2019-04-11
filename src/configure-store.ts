import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './store';

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
