import RootToast from './lib/root-toast';
import { FrameConstants, STYLE_SIZE } from '../../variable';

export default class Toast {
  static showBottom(message: string) {
    return RootToast.show(message, {
      position: {
        position: 'bottom',
        offset: FrameConstants.safeAreaBottom + 44 + STYLE_SIZE.SPACING_2,
      },
      duration: RootToast.durations.LONG,
    });
  }

  static showMiddle(
    message: string,
    type: 'error' | 'info' | 'loading' = 'loading'
  ) {
    return RootToast.show(message, {
      position: {
        position: 'middle',
        offset: 0,
      },
      duration: RootToast.durations.LONG,
    });
  }
}
