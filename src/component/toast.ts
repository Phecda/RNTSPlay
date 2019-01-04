import RootToast from 'react-native-root-toast';
import { FrameConstants, STYLE_SIZE } from '../variable';

export default class Toast {
  static showBottom(message: string) {
    RootToast.show(message, {
      position: -(FrameConstants.safeAreaBottom + 44 + STYLE_SIZE.SPACING_2),
    });
  }
}
