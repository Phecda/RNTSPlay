import React from 'react';
import {
  Image,
  View,
  ImageProps,
  StyleSheet,
  LayoutChangeEvent,
  ImageURISource,
} from 'react-native';

interface Props extends ImageProps {
  source: ImageURISource;
}

interface State {
  width?: number;
  height?: number;
}

export default class FullWidthImage extends React.Component<Props, State> {
  state: State = {
    width: this.props.width,
    height: this.props.height,
  };
  _root: View | null = null;

  setNativeProps(nativeProps: any) {
    this._root && this._root.setNativeProps(nativeProps);
  }

  _onLayout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width;

    if (this.props.width && this.props.height) {
      this.setState({
        width: containerWidth,
        height: containerWidth * (this.props.height / this.props.width),
      });
    } else if (this.props.source && this.props.source.uri) {
      Image.getSize(
        this.props.source.uri,
        (width, height) => {
          this.setState({
            width: containerWidth,
            height: (containerWidth * height) / width,
          });
        },
        err => {}
      );
    }
  };

  render() {
    return (
      <View
        ref={component => (this._root = component)}
        onLayout={this._onLayout}
        style={styles.container}
      >
        <Image
          source={this.props.source}
          style={[
            this.props.style,
            {
              width: this.state.width,
              height: this.state.height,
            },
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
