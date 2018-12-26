import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { ScreenID } from '../variable';
import SampleHome from './sample/sample-home';
import WPCategory from './wallpaper/category';
import WPPapersInCategory from './wallpaper/papers-in-category';
import WPImageDetail from './wallpaper/image-detail';

const HomeTabNavigator = createBottomTabNavigator({
  [ScreenID.Wallpaper_Category]: WPCategory,
});

const MainStack = createStackNavigator(
  {
    HomeTab: HomeTabNavigator,
    [ScreenID.Sample_Home]: SampleHome,
    [ScreenID.Wallpaper_Papers]: WPPapersInCategory,
    [ScreenID.Wallpaper_Detail]: WPImageDetail,
  },
  {
    headerTransitionPreset: 'uikit',
  }
);

const RootSwitchNavigator = createSwitchNavigator({
  Main_Stack: MainStack,
});

export default RootSwitchNavigator;
