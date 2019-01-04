import React from 'react';
import { TouchableHighlight, View, Image, Text } from 'react-native';
import { ActionDualCellProps } from './types';
import { STYLE_COLOR, STYLE_SIZE } from '../../variable';
import tableCellStyles from './styles';

export default ({
  icon,
  iconSize = STYLE_SIZE.ICON_M,
  roundIcon,
  title,
  detailText,
  detailComponent,
  onPress,
  disabled,
  forceHideRightAngle,
  dualText,
}: ActionDualCellProps) => {
  const rightAngleVisible = !forceHideRightAngle && onPress;
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      style={{ backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND }}
      underlayColor={STYLE_COLOR.CELL_UNDERLAY}
    >
      <View style={[tableCellStyles.container, tableCellStyles.dualContainer]}>
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
        <View style={tableCellStyles.dualTitleContainer}>
          {!!title && (
            <Text style={tableCellStyles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {!!dualText && (
            <Text style={tableCellStyles.dualText} numberOfLines={1}>
              {dualText}
            </Text>
          )}
        </View>
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
