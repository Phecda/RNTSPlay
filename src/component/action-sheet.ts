import { ActionSheetIOS, Platform } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

interface ActionSheetOptions {
  options: string[];
  title?: string;
  message?: string;
  /**
   * On iOS this indicates whether the action sheet has a cancel button.
   * On Android this indicates whether the sheet can be canceled by tapping backdrop or back button
   */
  cancelable?: boolean;
  cancelText?: string;
}

type ActionSheetResult =
  | {
      selectedText: string;
      selectedIndex: number;
    }
  | 'cancelAction';

export default class ActionSheet {
  static show({
    options,
    title,
    message,
    cancelable = true,
    cancelText = '取消',
  }: ActionSheetOptions): Promise<ActionSheetResult> {
    if (Platform.OS === 'ios') {
      let cancelButtonIndex: number;
      if (cancelable) {
        cancelButtonIndex = options.length;
        options.push(cancelText);
      }
      return new Promise((resolve, reject) => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            title,
            message,
            cancelButtonIndex,
          },
          index => {
            if (index === cancelButtonIndex) {
              resolve('cancelAction');
            } else {
              resolve({
                selectedIndex: index,
                selectedText: options[index],
              });
            }
          }
        );
      });
    } else if (Platform.OS === 'android') {
      const items = options.map((opt, index) => ({ label: opt, id: index }));
      return new Promise((resolve, reject) => {
        DialogAndroid.showPicker(title || null, message || null, {
          items,
          cancelable,
          positiveText: null,
          type: message ? 'listRadio' : 'listPlain',
        })
          .then(result => {
            if (
              result.action === DialogAndroid.actionDismiss ||
              result.action === DialogAndroid.actionNegative
            ) {
              resolve('cancelAction');
            } else if (
              result.action === DialogAndroid.actionSelect &&
              'selectedItem' in result
            ) {
              resolve({
                selectedText: result.selectedItem.label,
                selectedIndex: result.selectedItem.id as number,
              });
            } else {
              reject('Unhandled');
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    } else {
      throw Error('Platform Error');
    }
  }
}
