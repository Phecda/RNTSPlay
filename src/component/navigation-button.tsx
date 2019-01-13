import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { STYLE_SIZE, FrameConstants, STYLE_COLOR } from '../variable';

interface IconNavButtonProps {
  type?:
    | 'zocial'
    | 'octicon'
    | 'material'
    | 'material-community'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'font-awesome'
    | 'simple-line-icon'
    | 'feather';
  onPress: () => void;
  name: string;
  tintColor?: string;
}

export const IconNavButton: React.FunctionComponent<IconNavButtonProps> = ({
  onPress,
  name,
  type,
  tintColor = STYLE_COLOR.TEXT_MAIN,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Icon name={name} type={type} color={tintColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: FrameConstants.navBarHeight,
    width: FrameConstants.navBarHeight,
  },
});
