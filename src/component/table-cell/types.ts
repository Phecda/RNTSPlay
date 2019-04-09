import React from 'react';
import {
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
} from 'react-native';
interface ActionCellBaseProps extends TouchableWithoutFeedbackProps {
  icon?: ImageSourcePropType;
  iconSize?: number;
  roundIcon?: boolean;

  title?: string;

  detailText?: string;
  detailComponent?: React.ReactElement<any>;
  forceHideRightAngle?: boolean;
}

export interface ActionCellProps extends ActionCellBaseProps {}

export interface ActionDualCellProps extends ActionCellBaseProps {
  dualText?: string;
}
