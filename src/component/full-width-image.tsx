import React from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';
import Toast from './toast';

interface Props extends ImageProps {
  source: ImageURISource;
  initialSize: {
    width: number;
    height: number;
  };
}

interface State {
  width?: number;
  height?: number;
}

export default class FullWidthImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.initialSize,
    };
  }

  componentDidMount() {
    this.props.source.uri &&
      Image.getSize(
        this.props.source.uri,
        (width, height) => {
          this.setState({
            width: this.props.initialSize.width,
            height: (this.props.initialSize.width * height) / width,
          });
        },
        err => {
          Toast.showBottom(err.message);
        }
      );
  }

  render() {
    return (
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
    );
  }
}
