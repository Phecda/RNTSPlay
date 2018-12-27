import { createStackNavigator } from 'react-navigation';
import { ScreenID } from '../../variable';
import WPCategory from './category';
import WPPapersInCategory from './papers-in-category';
import WPImageDetail from './image-detail';

export default createStackNavigator({
  [ScreenID.Wallpaper_Category]: WPCategory,
  [ScreenID.Wallpaper_Papers]: WPPapersInCategory,
  [ScreenID.Wallpaper_Detail]: WPImageDetail,
});
