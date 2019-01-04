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
import {
  QHWPCategory,
  QHWPPapersInCategory,
  QHWPImageDetail,
} from './qh-wallpaper';
import SampleHome from './sample/sample-home';

const HomeTabNavigator = createBottomTabNavigator({
  [ScreenID.AD_Wallpaper_Category]: ADWPCategory,
  [ScreenID.QH_Wallpaper_Category]: QHWPCategory,
  [ScreenID.Sample_Home]: SampleHome,
});

const MainStack = createStackNavigator({
  HomeTab: HomeTabNavigator,
  [ScreenID.AD_Wallpaper_Detail]: ADWPImageDetail,
  [ScreenID.AD_Wallpaper_Papers]: ADWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Papers]: QHWPPapersInCategory,
  [ScreenID.QH_Wallpaper_Detail]: QHWPImageDetail,
});

export default MainStack;
