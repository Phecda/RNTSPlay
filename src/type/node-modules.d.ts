declare module 'react-navigation-props-mapper' {
  function withMappedNavigationProps(): Function;
  function withMappedNavigationAndConfigProps(): Function;
}

declare module 'react-native-platform-touchable' {
  // Type definitions for react-native-platform-touchable 1.1
  // Project: https://github.com/react-native-community/react-native-platform-touchable
  // Definitions by: Toni Granados <https://github.com/tngranados>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
  // TypeScript Version: 2.8

  import * as React from 'react';
  import {
    BackgroundPropType,
    RippleBackgroundPropType,
    ThemeAttributeBackgroundPropType,
    TouchableWithoutFeedbackProps,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
  } from 'react-native';

  export interface PlatformTouchableProps extends TouchableWithoutFeedbackProps {
    // General
    fallback?: typeof TouchableOpacity | typeof TouchableHighlight | typeof TouchableWithoutFeedback;
    // TouchableOpacity (default iOS)
    activeOpacity?: number;
    // TouchableNativeFeedback (default Android)
    background?: BackgroundPropType;
    foreground?: BackgroundPropType;
    // TouchableHighlight
    underlayColor?: string;
    onHideUnderlay?: () => void;
    onShowUnderlay?: () => void;
  }

  export class Touchable extends React.Component<PlatformTouchableProps> {
    // TouchableOpacity (default iOS)
    setOpacityTo: (value: number) => void;
    // TouchableNativeFeedback (default Android)
    static SelectableBackground(): ThemeAttributeBackgroundPropType;
    static SelectableBackgroundBorderless(): ThemeAttributeBackgroundPropType;
    static Ripple(color: string, borderless?: boolean): RippleBackgroundPropType;
    static canUseNativeForeground(): boolean;
  }

  export default Touchable;
}
