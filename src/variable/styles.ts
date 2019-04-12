import { StyleSheet } from 'react-native';
import { STYLE_COLOR } from '.';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STYLE_COLOR.CONTAINER_BACKGROUND,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default commonStyles;
