declare module 'react-native-dialogs' {
  type ActionType =
    | 'actionDismiss'
    | 'actionNegative'
    | 'actionNeutral'
    | 'actionPositive'
    | 'actionSelect';

  interface ListItem {
    label: string;
    id: any;
  }

  type ListType = 'listCheckbox' | 'listPlain' | 'listRadio';

  export type KeyboardType =
    | 'numeric'
    | 'number-pad'
    | 'numeric-password'
    | 'email-address'
    | 'password'
    | 'phone-pad'
    | 'decimal-pad'
    | 'url';

  interface OptionsCommon {
    cancelable?: boolean;
    content?: string;
    contentColor?: string;
    contentIsHtml?: boolean;
    forceStacking?: boolean;
    linkColor?: string;
    negativeColor?: string;
    negativeText?: string;
    neutralColor?: string;
    neutralText?: string;
    positiveColor?: string;
    positiveText?: string | null; // default "OK"
    title?: string;
    titleColor?: string;
  }

  type ProgressStyle = 'progressHorizontal';
  type OptionsProgress = { style?: ProgressStyle } & {
    contentColor: Pick<OptionsCommon, 'contentColor'>;
    contentIsHtml: Pick<OptionsCommon, 'contentIsHtml'>;
    linkColor: Pick<OptionsCommon, 'linkColor'>;
    title: Pick<OptionsCommon, 'title'>;
    titleColor: Pick<OptionsCommon, 'titleColor'>;
    widgetColor: string;
  };

  interface OptionsPicker extends OptionsCommon {
    idKey?: string;
    items: ListItem[];
    labelKey?: string;
    neutralIsClear?: boolean;
    selectedId?: any;
    selectedIds?: any[];
    type?: ListType;
    widgetColor?: string;
  }

  interface OptionsPrompt extends OptionsCommon {
    keyboardType?: KeyboardType;
    defaultValue?: string;
    placeholder?: string;
    allowEmptyInput?: boolean;
    minLength?: number;
    maxLength?: number;
  }
  class DialogAndroid {
    static listPlain: 'listPlain';
    static listRadio: 'listRadio';
    static listCheckbox: 'listCheckbox';

    static actionDismiss: 'actionDismiss';
    static actionNegative: 'actionNegative';
    static actionNeutral: 'actionNeutral';
    static actionPositive: 'actionPositive';
    static actionSelect: 'actionSelect';

    static progressHorizontal: 'progressHorizontal';

    static defaults: {
      positiveText: 'OK';
    };

    static assignDefaults(defaults: Partial<OptionsCommon>): void;

    static prompt(
      title: string | null,
      content: string | null,
      options: OptionsPrompt
    ): Promise<
      | {
          action:
            | typeof DialogAndroid.actionNegative
            | typeof DialogAndroid.actionNeutral
            | typeof DialogAndroid.actionDismiss;
        }
      | {
          action:
            | typeof DialogAndroid.actionNegative
            | typeof DialogAndroid.actionNeutral;
          checked: boolean;
        }
      | { action: typeof DialogAndroid.actionPositive; text: string }
      | {
          action: typeof DialogAndroid.actionPositive;
          text: string;
          checked: boolean;
        }
    >;

    static showPicker(
      title: string | null,
      content: string | null,
      options: OptionsPicker
    ): Promise<
      | {
          action:
            | typeof DialogAndroid.actionNegative
            | typeof DialogAndroid.actionNeutral
            | typeof DialogAndroid.actionDismiss;
        }
      | {
          action:
            | typeof DialogAndroid.actionNegative
            | typeof DialogAndroid.actionNeutral;
          checked: boolean;
        }
      | {
          action: typeof DialogAndroid.actionSelect;
          selectedItem: ListItem;
          checked?: boolean;
        }
      | {
          action: typeof DialogAndroid.actionSelect;
          selectedItems: ListItem[];
          checked?: boolean;
        }
    >;

    static dismiss(): void;
  }

  export default DialogAndroid;
}

declare module 'react-navigation-props-mapper' {
  function withMappedNavigationProps(): Function;
  function withMappedNavigationAndConfigProps(): Function;
}
