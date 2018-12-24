import { ActionSheetIOS, Platform } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

type ActionSheetConfig = {
  options: string[];
  title?: string;
  message?: string;
  onCancel?: () => void;
  onSelect: (index: number) => void;
  selectedIndex?: number;
};
export default function showActionSheet({
  options,
  title,
  message,
  onCancel,
  onSelect,
  selectedIndex,
}: ActionSheetConfig) {
  console.log(Platform.OS);
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options.concat(['取消']),
        cancelButtonIndex: options.length,
        title,
        message,
      },
      buttonIndex => {
        if (buttonIndex === options.length) {
          onCancel && onCancel();
        } else {
          onSelect(buttonIndex);
        }
      }
    );
  } else if (Platform.OS === 'android') {
    DialogAndroid.showPicker(title || null, message || null, {
      items: options.map((option, index) => ({ id: index, label: option })),
      negativeText: '取消',
      positiveText: null,
      type:
        selectedIndex != undefined && selectedIndex >= 0
          ? DialogAndroid.listRadio
          : undefined,
    }).then(result => {
      if (
        result.action === 'actionSelect' &&
        'selectedItem' in result &&
        'id' in result.selectedItem
      ) {
        onSelect(result.selectedItem.id);
      } else {
        onCancel && onCancel();
      }
    });
  }
}
