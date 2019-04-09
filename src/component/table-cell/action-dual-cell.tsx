import React from 'react';
import { TouchableHighlight, View, Image, Text } from 'react-native';
import { ActionDualCellProps } from './types';
import { STYLE_COLOR, STYLE_SIZE } from '../../variable';
import tableCellStyles from './styles';
import { SafeAreaView } from 'react-navigation';

export default ({
  icon,
  iconSize = STYLE_SIZE.ICON_M,
  roundIcon,
  title,
  detailText,
  detailComponent,
  forceHideRightAngle,
  dualText,
  ...touchableProps
}: ActionDualCellProps) => {
  const rightAngleVisible = !forceHideRightAngle && touchableProps.onPress;
  return (
    <TouchableHighlight
      style={{ backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND }}
      underlayColor={STYLE_COLOR.CELL_UNDERLAY}
      {...touchableProps}
    >
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'never' }}
        style={[tableCellStyles.container, tableCellStyles.dualContainer]}
      >
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
      </SafeAreaView>
    </TouchableHighlight>
  );
};
