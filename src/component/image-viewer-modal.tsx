import React from 'react';
import { Modal, ModalProps, View, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ImageViewerModalProps extends ModalProps {
  imageUrl: string;
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
    const { imageUrl, onRequestClose } = this.props;
    return (
      <Modal transparent={true} {...this.props}>
        <ImageViewer
          imageUrls={[{ url: imageUrl }]}
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
