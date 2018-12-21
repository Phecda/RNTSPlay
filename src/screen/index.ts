import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { ScreenID } from '../variable';
import SampleHome from './sample/sample-home';

const MainStack = createStackNavigator(
  {
    [ScreenID.Sample_Home]: SampleHome,
  },
  {}
);

const RootSwitchNavigator = createSwitchNavigator({
  Main_Stack: MainStack,
});

export default RootSwitchNavigator;
