import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationRouteConfigMap,
  createSwitchNavigator,
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenID, STYLE_COLOR } from '../variable';
import { ADWPImageDetail, ADWPPapersInCategory, ADWPSearch, ADWPHome } from './ad-wallpaper';
import SampleHome from './sample/sample-home';
import DeviceInfo from './sample/device-info';
import LoginPage from './authentication/login';
import AuthenticationLoading from './authentication/loading-page';

const tabRoutes = {
  [ScreenID.AD_Wallpaper_Home]: {
    component: ADWPHome,
    icon: (tintColor: string) => <Feather name="sun" size={25} color={tintColor} />,
    headerTitle: '光点壁纸',
  },
  [ScreenID.Sample_Home]: {
    component: SampleHome,
    icon: (tintColor: string) => <Feather name="list" size={25} color={tintColor} />,
    headerTitle: '样例',
  },
};

const navigationRouteMap: NavigationRouteConfigMap = {};
Object.keys(tabRoutes).forEach(key => {
  navigationRouteMap[key] = tabRoutes[key].component;
});

const HomeTabNavigator = createBottomTabNavigator(navigationRouteMap, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const route = tabRoutes[routeName];
        return route ? route.icon(tintColor!) : null;
      },
    };
  },
  tabBarOptions: {
    activeTintColor: STYLE_COLOR.THEME_COLOR,
  },
});

HomeTabNavigator.navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => {
  const { routes, index } = navigation.state;
  const { routeName } = routes[index];
  const route = tabRoutes[routeName];

  const options: NavigationScreenOptions = {};
  options.headerTitle = route.headerTitle;

  if (routeName === ScreenID.AD_Wallpaper_Home) {
    options.header = null;
  }
  return options;
};

const MainStack = createStackNavigator(
  {
    HomeTab: HomeTabNavigator,
    [ScreenID.AD_Wallpaper_Detail]: ADWPImageDetail,
    [ScreenID.AD_Wallpaper_Papers]: ADWPPapersInCategory,
    [ScreenID.AD_Wallpaper_Search]: ADWPSearch,
    [ScreenID.Sample_Device_Info]: DeviceInfo,
  },
  {
    headerTransitionPreset: 'uikit',
    defaultNavigationOptions: {
      headerTintColor: STYLE_COLOR.TEXT_MAIN,
      headerStyle: {
        backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND,
      },
    },
  }
);

export default createSwitchNavigator(
  {
    [ScreenID.App_Main_Stack]: MainStack,
    [ScreenID.AUTH_LOGIN]: LoginPage,
    [ScreenID.APP_AUTH_LOADING]: AuthenticationLoading,
  },
  {
    initialRouteName: ScreenID.APP_AUTH_LOADING,
  }
);
