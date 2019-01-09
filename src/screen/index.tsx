import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
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

const HomeTabNavigator = createBottomTabNavigator(
  {
    [ScreenID.AD_Wallpaper_Category]: ADWPCategory,
    [ScreenID.QH_Wallpaper_Category]: QHWPCategory,
    [ScreenID.Sample_Home]: SampleHome,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarIcon: ({
          focused,
          horizontal,
          tintColor = STYLE_COLOR.THEME_BLUE,
        }) => {
          const { routeName } = navigation.state;
          switch (routeName) {
            case ScreenID.AD_Wallpaper_Category:
              /* tslint:disable */
              return <Feather name="sun" size={25} color={tintColor!} />;
            case ScreenID.QH_Wallpaper_Category:
              return <Feather name="shield" size={25} color={tintColor!} />;
            case ScreenID.Sample_Home:
              return <Feather name="list" size={25} color={tintColor!} />;
            /* tslint:enable */
            default:
              return null;
          }
        },
      };
    },
  }
);

const MainStack = createStackNavigator({
  HomeTab: HomeTabNavigator,
  [ScreenID.AD_Wallpaper_Detail]: ADWPImageDetail,
  [ScreenID.AD_Wallpaper_Papers]: ADWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Papers]: QHWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Detail]: QHWPImageDetail,
});

export default MainStack;
