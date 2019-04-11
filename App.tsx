import * as React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ignoreYellowbox from './src/yellowbox';

import configureStore from './src/configure-store';
import RootSwitchNavigator from './src/screen';
import { ActivityIndicator } from 'react-native';

ignoreYellowbox();

const AppContainer = createAppContainer(RootSwitchNavigator);
const { store, persistor } = configureStore();

const loadingView = (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator />
  </SafeAreaView>
);

interface Props {}
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={loadingView} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
