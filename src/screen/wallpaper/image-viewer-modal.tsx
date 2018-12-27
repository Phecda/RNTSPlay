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
  image: WallPaperProps;
  onRequestClose: () => void;
}

interface ImageViewerModalState {
  barVisible: boolean;
}

export default class ImageViewerModal extends React.Component<
  ImageViewerModalProps,
  ImageViewerModalState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      barVisible: true,
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
  }

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
      <Modal transparent={true} {...this.props}>
        <ImageViewer
          imageUrls={[{ url }]}
          onCancel={onRequestClose}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          onClick={() => {
            this._toggleTopBar();
          }}
          renderIndicator={() => <View />}
        />
      </Modal>
    );
  }
}
