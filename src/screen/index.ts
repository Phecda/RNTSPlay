import { createBottomTabNavigator } from 'react-navigation';
import ADeskStack from './wallpaper';

const HomeTabNavigator = createBottomTabNavigator({
  adesk: ADeskStack,
});

export default HomeTabNavigator;
