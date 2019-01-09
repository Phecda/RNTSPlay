import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  ViewStyle,
  TextStyle,
  StyleProp,
  ScaledSize,
} from 'react-native';
const TOAST_MAX_WIDTH = 0.8;
const TOAST_ANIMATION_DURATION = 200;

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0,
};

const durations = {
  LONG: 3500,
  SHORT: 2000,
};

const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    padding: 10,
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 5,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export interface ToastOptions {
  containerStyle?: StyleProp<ViewStyle>;
  duration?: number;
  visible?: boolean;
  position?: {
    position: 'top' | 'bottom' | 'middle';
    offset: number;
  };
  animation?: boolean;
  shadow?: boolean;
  backgroundColor?: string;
  opacity?: number;
  shadowColor?: string;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  delay?: number;
  hideOnPress?: boolean;
  onPress?: () => void;
  onHide?: () => void;
  onHidden?: () => void;
  onShow?: () => void;
  onShown?: () => void;
}

interface ToastContainerState {
  visible: boolean;
  opacity: Animated.Value;
  windowWidth: number;
  windowHeight: number;
  keyboardScreenY: number;
}

class ToastContainer extends React.Component<
  ToastOptions,
  ToastContainerState
> {
  static displayName = 'ToastContainer';

  static defaultProps: ToastOptions = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: true,
    opacity: 0.8,
    delay: 0,
    hideOnPress: true,
    position: {
      position: 'bottom',
      offset: 40,
    },
  };

  state: ToastContainerState = {
    visible: !!this.props.visible,
    opacity: new Animated.Value(0),
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    keyboardScreenY: Dimensions.get('window').height,
  };

  componentDidMount = () => {
    Dimensions.addEventListener('change', this._windowChanged);
    Keyboard.addListener(
      'keyboardDidChangeFrame',
      this._keyboardDidChangeFrame
    );
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    }
  };

  static getDerivedStateFromProps = (
    nextProps: ToastOptions,
    prevState: ToastContainerState
  ) => {
    return {
      visible: nextProps.visible,
    };
  };

  getSnapshotBeforeUpdate(
    prevProps: ToastOptions,
    prevState: ToastContainerState
  ) {
    const { windowHeight, keyboardScreenY } = prevState;
    this._keyboardHeight = Math.max(windowHeight - keyboardScreenY, 0);
  }

  componentDidUpdate(prevProps: ToastOptions, prevState: ToastContainerState) {
    if (!prevProps.visible && this.props.visible) {
      this._showTimeout !== undefined && clearTimeout(this._showTimeout);
      this._hideTimeout !== undefined && clearTimeout(this._hideTimeout);
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    } else if (prevProps.visible && !this.props.visible) {
      this._hide();
    }
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this._windowChanged);
    Keyboard.removeListener(
      'keyboardDidChangeFrame',
      this._keyboardDidChangeFrame
    );
    this._hide();
  };

  _animating = false;
  _root: any = null;
  _hideTimeout?: number;
  _showTimeout?: number;
  _keyboardHeight = 0;

  _windowChanged = ({ window }: { window: ScaledSize }) => {
    this.setState({
      windowWidth: window.width,
      windowHeight: window.height,
    });
  };

  _keyboardDidChangeFrame = ({ endCoordinates }: any) => {
    this.setState({
      keyboardScreenY: endCoordinates.screenY,
    });
  };

  _show = () => {
    this._showTimeout !== undefined && clearTimeout(this._showTimeout);
    if (!this._animating) {
      this._hideTimeout !== undefined && clearTimeout(this._hideTimeout);
      this._animating = true;
      this._root.setNativeProps({
        pointerEvents: 'auto',
      });
      this.props.onShow && this.props.onShow();
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this._animating = !finished;
          this.props.onShown && this.props.onShown();
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(
              () => this._hide(),
              this.props.duration
            );
          }
        }
      });
    }
  };

  _hide = () => {
    this._showTimeout !== undefined && clearTimeout(this._showTimeout);
    this._hideTimeout !== undefined && clearTimeout(this._hideTimeout);
    if (!this._animating) {
      this._root.setNativeProps({
        pointerEvents: 'none',
      });
      this.props.onHide && this.props.onHide();
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this._animating = false;
          this.props.onHidden && this.props.onHidden();
        }
      });
    }
  };

  render() {
    const {
      onPress,
      hideOnPress,
      containerStyle,
      backgroundColor,
      shadow,
      shadowColor,
      textColor,
      textStyle,
      position,
    } = this.props;
    const { windowWidth } = this.state;

    const _position =
      position.position === 'middle'
        ? {
            top: 0,
            bottom: this._keyboardHeight,
          }
        : {
            [position.position]: position.offset,
          };

    return this.state.visible || this._animating ? (
      <View style={[styles.defaultStyle, _position]} pointerEvents="box-none">
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress && this.props.onPress();
            this.props.hideOnPress && this._hide();
          }}
        >
          <Animated.View
            style={[
              styles.containerStyle,
              { marginHorizontal: windowWidth * ((1 - TOAST_MAX_WIDTH) / 2) },
              containerStyle,
              backgroundColor && {
                backgroundColor,
              },
              {
                opacity: this.state.opacity,
              },
              shadow && styles.shadowStyle,
              shadowColor && { shadowColor },
            ]}
            pointerEvents="none"
            ref={(ele: any) => (this._root = ele)}
          >
            {typeof this.props.children === 'string' ? (
              <Text
                style={[
                  styles.textStyle,
                  textStyle,
                  !!textColor && { color: textColor },
                ]}
              >
                {this.props.children}
              </Text>
            ) : (
              this.props.children
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    ) : null;
  }
}

export default ToastContainer;
export { positions, durations };
