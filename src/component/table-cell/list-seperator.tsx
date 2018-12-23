import React from 'react';
import { View } from 'react-native';
import tableCellStyles from './styles';
import { STYLE_SIZE } from '../../variable';

interface SeperatorProps {
  leftWidth?: number;
  rightWidth?: number;
}

export default ({
  leftWidth = STYLE_SIZE.SPACING_2,
  rightWidth = 0,
}: SeperatorProps) => (
  <View
    style={[
      tableCellStyles.seperatorBackground,
      { paddingLeft: leftWidth, paddingRight: rightWidth },
    ]}
  >
    <View style={tableCellStyles.seperatorLine} />
  </View>
);
