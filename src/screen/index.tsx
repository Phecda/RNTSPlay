import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationRouteConfigMap,
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenID, STYLE_COLOR } from '../variable';
import {
  ADWPCategory,
  ADWPImageDetail,
  ADWPPapersInCategory,
} from './ad-wallpaper';
import {
  QHWPCategory,
  QHWPPapersInCategory,
  QHWPImageDetail,
} from './qh-wallpaper';
import SampleHome from './sample/sample-home';

const tabRoutes = {
  [ScreenID.AD_Wallpaper_Category]: {
    component: ADWPCategory,
    icon: (tintColor: string) => (
      <Feather name="sun" size={25} color={tintColor} />
    ),
    headerTitle: '光点壁纸',
  },
  [ScreenID.QH_Wallpaper_Category]: {
    component: QHWPCategory,
    icon: (tintColor: string) => (
      <Feather name="shield" size={25} color={tintColor} />
    ),
    headerTitle: '360壁纸',
  },
  [ScreenID.Sample_Home]: {
    component: SampleHome,
    icon: (tintColor: string) => (
      <Feather name="list" size={25} color={tintColor} />
    ),
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
      tabBarIcon: ({
        focused,
        horizontal,
        tintColor = STYLE_COLOR.THEME_BLUE,
      }) => {
        const { routeName } = navigation.state;
        const route = tabRoutes[routeName];
        return route ? route.icon(tintColor) : null;
      },
    };
  },
});

HomeTabNavigator.navigationOptions = ({
  navigation,
}: NavigationScreenProps): NavigationScreenOptions => {
  const { routes, index } = navigation.state;
  const { routeName } = routes[index];
  const route = tabRoutes[routeName];
  return {
    headerTitle: route ? route.headerTitle : '首页',
  };
};

const MainStack = createStackNavigator({
  HomeTab: HomeTabNavigator,
  [ScreenID.AD_Wallpaper_Detail]: ADWPImageDetail,
  [ScreenID.AD_Wallpaper_Papers]: ADWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Papers]: QHWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Detail]: QHWPImageDetail,
});

export default MainStack;
