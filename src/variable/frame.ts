import { Platform, Dimensions, StatusBar } from 'react-native';

const isIPhoneX = () => {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
};

export default {
  isIPhoneX,
  safeAreaTop: isIPhoneX() ? 24 : 0,
  safeAreaBottom: isIPhoneX() ? 34 : 0,
  statusBarHeight: StatusBar.currentHeight || 20,
  navBarHeight: Platform.OS === 'ios' ? 44 : Platform.OS === 'android' ? 56 : 0,
};
