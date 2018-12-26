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
import Toast from '../../component/toast';

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
    //
  }

  componentDidUpdate(
    prevProps: ImageViewerModalProps,
    prevState: ImageViewerModalState
  ) {
    if (prevProps.visible !== this.props.visible) {
      this._toggleTopBar(true);
    }
    if (!prevProps.visible && this.props.visible) {
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
    if (!image) return;
    saveRemoteImage(image.preview)
      .then(some => {
        Toast.showBottom('保存成功');
      })
      .catch(err => {
        Toast.showBottom(`保存失败，${err.message}`);
      });
  };

  _toggleTopBar = (willVisible?: boolean) => {
    const { barVisible } = this.state;
    const willTopBarVisible =
      willVisible !== undefined ? willVisible : !barVisible;
    this.setState({
      barVisible: willTopBarVisible,
    });
    StatusBar.setHidden(!willTopBarVisible, 'fade');
  };

  render() {
    const { image, onRequestClose } = this.props;
    const { barVisible } = this.state;
    let url = '';
    if (image) {
      url = image.preview;
    }
    return (
      <Modal transparent {...this.props}>
        <ImageViewer
          imageUrls={[{ url }]}
          onCancel={onRequestClose}
          enableSwipeDown
          saveToLocalByLongPress={false}
          onClick={() => {
            this._toggleTopBar();
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
