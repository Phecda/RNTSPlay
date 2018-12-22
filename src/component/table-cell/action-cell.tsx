import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text,
} from 'react-native';
import { ActionCellProps } from './types';
import { STYLE_COLOR, STYLE_SIZE } from '../../variable';

export default ({
  icon,
  iconSize = STYLE_SIZE.ICON_S,
  roundIcon,
  title,
  detailText,
  detailComponent,
  onPress,
  disabled,
  forceHideRightAngle,
}: ActionCellProps) => {
  const rightAngleVisible = !forceHideRightAngle && onPress;
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      style={{ backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND }}
      underlayColor={STYLE_COLOR.CELL_UNDERLAY}
    >
      <View>
        {!!icon && (
          <Image
            source={icon}
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: roundIcon ? iconSize : 0,
            }}
          />
        )}
        {!!title && <Text>{title}</Text>}
        {detailText ? (
          <Text>{detailText}</Text>
        ) : detailComponent ? (
          detailComponent
        ) : null}
        {rightAngleVisible && (
          <Image source={require('../../assets/ico_arrow_r.png')} />
        )}
      </View>
    </TouchableHighlight>
  );
};
