import RootToast from 'react-native-root-toast';

export default class Toast {
  static showBottom(message: string) {
    RootToast.show(message, {
      position: RootToast.positions.BOTTOM,
    });
  }
}
