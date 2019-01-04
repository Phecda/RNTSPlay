import React from 'react';
import { TouchableHighlight, View, Image, Text } from 'react-native';
import { ActionCellProps } from './types';
import { STYLE_COLOR, STYLE_SIZE } from '../../variable';
import tableCellStyles from './styles';

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
      <View style={tableCellStyles.container}>
        {!!icon && (
          <Image
            source={icon}
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: roundIcon ? iconSize / 2 : 0,
              marginRight: STYLE_SIZE.SPACING_1_5,
            }}
          />
        )}
        {!!title && (
          <Text style={tableCellStyles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
        {detailText ? (
          <Text style={tableCellStyles.detailText} numberOfLines={1}>
            {detailText}
          </Text>
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
