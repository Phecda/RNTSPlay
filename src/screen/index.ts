import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { ScreenID } from '../variable';
import {
  ADWPCategory,
  ADWPImageDetail,
  ADWPPapersInCategory,
} from './ad-wallpaper';
import { QHWPCategory } from './qh-wallpaper';

const HomeTabNavigator = createBottomTabNavigator({
  [ScreenID.AD_Wallpaper_Category]: ADWPCategory,
  [ScreenID.QH_Wallpaper_Category]: QHWPCategory,
});

const MainStack = createStackNavigator({
  HomeTab: HomeTabNavigator,
  [ScreenID.AD_Wallpaper_Detail]: ADWPImageDetail,
  [ScreenID.AD_Wallpaper_Papers]: ADWPPapersInCategory,
});

export default MainStack;
