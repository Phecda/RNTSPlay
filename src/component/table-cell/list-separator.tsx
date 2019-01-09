import React from 'react';
import { View } from 'react-native';
import tableCellStyles from './styles';
import { STYLE_SIZE } from '../../variable';
import { SafeAreaView } from 'react-navigation';

interface SeparatorProps {
  leftWidth?: number;
  rightWidth?: number;
}

export default ({
  leftWidth = STYLE_SIZE.SPACING_2,
  rightWidth = 0,
}: SeparatorProps) => {
  const forceInset: any = {
    bottom: 'never',
    top: 'never',
  };
  if (!leftWidth) {
    forceInset.left = 'never';
  }
  if (!rightWidth) {
    forceInset.right = 'never';
  }
  return (
    <SafeAreaView
      forceInset={forceInset}
      style={[
        tableCellStyles.separatorBackground,
        { paddingLeft: leftWidth, paddingRight: rightWidth },
      ]}
    >
      <View style={tableCellStyles.separatorLine} />
    </SafeAreaView>
  );
};
