import React from 'react';
import { Modal, ModalProps } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';

interface ImageViewerModalProps extends ModalProps {
  images: IImageInfo[];
}

export default class ImageViewerModal extends React.Component<
  ImageViewerModalProps
> {
  render() {
    const { images, onRequestClose } = this.props;
    return (
      <Modal transparent {...this.props}>
        <ImageViewer
          imageUrls={images}
          onCancel={onRequestClose}
          enableSwipeDown
        />
      </Modal>
    );
  }
}
