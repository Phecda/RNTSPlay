import * as React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ignoreYellowbox from './src/yellowbox';

import configureStore from './src/configure-store';
import RootSwitchNavigator from './src/screen';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider, Theme } from 'react-native-elements';
import RNEThemes from './src/variable/theme';

ignoreYellowbox();

const AppContainer = createAppContainer(RootSwitchNavigator);
const { store, persistor } = configureStore();

const loadingView = (
  <SafeAreaView
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <ActivityIndicator />
  </SafeAreaView>
);

interface Props {}

interface State {
  theme: Theme;
}

export default class App extends React.Component<Props, State> {
  state: State = {
    theme: RNEThemes.light,
  };
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate loading={loadingView} persistor={persistor}>
          <ThemeProvider theme={this.state.theme}>
            <AppContainer />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    );
  }
}
