import { createBottomTabNavigator } from 'react-navigation';
import ADeskStack from './ad-wallpaper';

const HomeTabNavigator = createBottomTabNavigator({
  adesk: ADeskStack,
});

export default HomeTabNavigator;
