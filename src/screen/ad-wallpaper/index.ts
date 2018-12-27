import { createStackNavigator } from 'react-navigation';
import { ScreenID } from '../../variable';
import WPCategory from './category';
import WPPapersInCategory from './papers-in-category';
import WPImageDetail from './image-detail';

export default createStackNavigator({
  [ScreenID.AD_Wallpaper_Category]: WPCategory,
  [ScreenID.AD_Wallpaper_Papers]: WPPapersInCategory,
  [ScreenID.AD_Wallpaper_Detail]: WPImageDetail,
});
