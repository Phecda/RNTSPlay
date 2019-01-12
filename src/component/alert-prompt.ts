import {
  AlertIOS,
  KeyboardTypeIOS,
  KeyboardType,
  Platform,
  AlertIOSButton,
  AlertType,
} from 'react-native';
import DialogAndroid, {
  KeyboardType as KeyboardTypeAndroid,
} from 'react-native-dialogs';

export type PromptKeyboardType =
  | KeyboardType
  | KeyboardTypeIOS
  | KeyboardTypeAndroid;

interface PromptOptions {
  title: string;
  message?: string;
  /**
   * @platform iOS
   */
  keyboardType?: PromptKeyboardType;
  type?: AlertType;
  cancelText?: string;
  confirmText?: string;
  confirmDestructive?: boolean;
  allowEmptyInput?: boolean;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

export default class Prompt {
  static show({
    title,
    message,
    keyboardType,
    cancelText,
    confirmText,
    confirmDestructive,
    allowEmptyInput,
    type,
    defaultValue,
    placeholder,
    maxLength,
    minLength,
  }: PromptOptions): Promise<
    | { action: 'confirm'; message: string }
    | { action: 'cancel'; message?: string }
  > {
    if (Platform.OS === 'ios') {
      return new Promise((resolve, reject) => {
        let callbackOrButtons;
        if (!cancelText && !confirmText) {
          callbackOrButtons = (text: string) => {
            resolve({ action: 'confirm', message: text });
          };
        } else {
          const buttons: AlertIOSButton[] = [];
          if (cancelText) {
            buttons.push({
              text: cancelText,
              style: 'cancel',
              onPress: msg => resolve({ action: 'cancel', message: msg || '' }),
            });
          }
          if (confirmText) {
            buttons.push({
              text: confirmText,
              style: confirmDestructive ? 'destructive' : 'default',
              onPress: msg =>
                resolve({ action: 'confirm', message: msg || '' }),
            });
          }
          callbackOrButtons = buttons;
        }
        AlertIOS.prompt(
          title,
          message,
          callbackOrButtons,
          type,
          defaultValue,
          keyboardType as KeyboardType | KeyboardTypeIOS
        );
      });
    } else if (Platform.OS === 'android') {
      const confirm = confirmText || '好';

      return new Promise((resolve, reject) => {
        DialogAndroid.prompt(title, message || null, {
          negativeText: cancelText,
          positiveText: confirm,
          positiveColor: confirmDestructive ? 'red' : undefined,
          allowEmptyInput,
          defaultValue,
          placeholder,
          maxLength,
          minLength,
          keyboardType: keyboardType as KeyboardTypeAndroid,
        })
          .then(result => {
            if (result.action === 'actionPositive') {
              resolve({ action: 'confirm', message: result.text });
            } else {
              resolve({ action: 'cancel' });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    } else {
      return Promise.reject('Error Platform');
    }
  }
}
