/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import RootSwitchNavigator from './src/screen';

const AppContainer = createAppContainer(RootSwitchNavigator);

interface Props {}
export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
