import React from 'react';
import {
  Modal,
  ModalProps,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  Image,
  Alert,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { STYLE_COLOR, FrameConstants } from '../../variable';
import { showActionSheet } from '../../utility/pop-view';
import { saveRemoteImage } from '../../utility/image-utils';

interface ModalImageInfo {
  url: string;
  rule: string;
}

interface ImageViewerModalProps extends ModalProps {
  image?: WallPaperProps | null;
}

interface ImageViewerModalState {
  barVisible: boolean;
  originWidth: number;
  originHeight: number;
}

const { height, width, scale } = Dimensions.get('screen');
const S_Height = height * scale;
const S_Width = width * scale;

export default class ImageViewerModal extends React.Component<
  ImageViewerModalProps,
  ImageViewerModalState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      barVisible: true,
      originHeight: 0,
      originWidth: 0,
    };
  }

  componentDidMount() {
    console.log('modal did mount');
  }

  componentDidUpdate(
    prevProps: ImageViewerModalProps,
    prevState: ImageViewerModalState
  ) {
    if (!prevProps.visible && this.props.visible) {
      this.setState({ barVisible: true });
      this._getOriginSize();
    }
  }

  _getOriginSize = () => {
    const { image } = this.props;
    if (image) {
      Image.getSize(
        image.preview,
        (w, h) => {
          this.setState({ originHeight: h, originWidth: w });
        },
        err => {
          Alert.alert('error', err.message);
        }
      );
    }
  };

  _showSave = () => {
    const { image } = this.props;
    const { originHeight, originWidth } = this.state;
    if (originHeight === S_Height && originWidth === S_Width) {
      Alert.alert('已保存');
      return;
    }
    const options = [`屏幕尺寸：${S_Width} * ${S_Height}`];
    if (originHeight && originWidth) {
      options.push(`原始尺寸：${originWidth} * ${originHeight}`);
    }
    showActionSheet({
      options,
      onSelect: index => {
        console.log(index);
        saveRemoteImage(image!.preview)
          .then(some => {
            console.log(some);
          })
          .catch(err => {
            console.log(err);
          });
      },
    });
  };

  render() {
    const { image, onRequestClose } = this.props;
    const { barVisible } = this.state;
    let url = '';
    if (image) {
      url =
        image.preview +
        image.rule
          .replace(/\$<Width>/g, `${S_Width}`)
          .replace(/\$<Height>/g, `${S_Height}`);
    }
    return (
      <Modal transparent {...this.props}>
        <ImageViewer
          imageUrls={[{ url, height: S_Height, width: S_Width }]}
          onCancel={onRequestClose}
          enableSwipeDown
          saveToLocalByLongPress={false}
          onClick={() => {
            this.setState({ barVisible: !barVisible });
          }}
          renderIndicator={() => <View />}
          renderHeader={currentIndex => (
            <View
              style={{
                backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                opacity: Number(barVisible),
                paddingTop:
                  Platform.OS === 'ios'
                    ? FrameConstants.statusBarHeight +
                      FrameConstants.safeAreaTop
                    : 0,
              }}
            >
              <View
                style={{
                  height: FrameConstants.navBarHeight,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button title="关闭" onPress={onRequestClose!} />
                <Button title="保存" onPress={this._showSave} />
              </View>
            </View>
          )}
        />
      </Modal>
    );
  }
}
