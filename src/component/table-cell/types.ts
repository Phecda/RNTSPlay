import React from 'react';
import { ImageSourcePropType } from 'react-native';
interface ActionCellBaseProps {
  icon?: ImageSourcePropType;
  iconSize?: number;
  roundIcon?: boolean;

  title?: string;

  detailText?: string;
  detailComponent?: React.ReactElement<any>;

  onPress?: () => void;
  disabled?: boolean;
  forceHideRightAngle?: boolean;
}

export interface ActionCellProps extends ActionCellBaseProps {}

export interface ActionDualCellProps extends ActionCellBaseProps {
  dualText?: string;
}
