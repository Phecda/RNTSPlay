import { YellowBox } from 'react-native';

const ignoreWarnings = ['Warning: Slider', 'Warning: ViewPagerAndroid'];

export default () => YellowBox.ignoreWarnings(ignoreWarnings);
