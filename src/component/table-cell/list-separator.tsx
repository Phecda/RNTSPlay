import React from 'react';
import { View } from 'react-native';
import tableCellStyles from './styles';
import { STYLE_SIZE } from '../../variable';

interface SeparatorProps {
  leftWidth?: number;
  rightWidth?: number;
}

export default ({
  leftWidth = STYLE_SIZE.SPACING_2,
  rightWidth = 0,
}: SeparatorProps) => (
  <View
    style={[
      tableCellStyles.separatorBackground,
      { paddingLeft: leftWidth, paddingRight: rightWidth },
    ]}
  >
    <View style={tableCellStyles.separatorLine} />
  </View>
);
