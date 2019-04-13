import * as React from 'react';
import { TextInputProps } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { STYLE_COLOR, STYLE_SIZE } from '../../variable';

export default class AuthInput extends React.PureComponent<
  {
    featherIcon: string;
  } & InputProps
> {
  input: Input | null = null;

  focus() {
    this.input!.focus();
  }

  render() {
    const { featherIcon, ...inputProps } = this.props;
    return (
      <Input
        ref={i => (this.input = i)}
        leftIcon={<Icon name={featherIcon} size={16} color={STYLE_COLOR.TEXT_GREY} />}
        leftIconContainerStyle={{ marginHorizontal: STYLE_SIZE.SPACING_1 }}
        containerStyle={{ width: '80%', marginBottom: STYLE_SIZE.SPACING_2 }}
        style={{ fontSize: 16 }}
        {...inputProps}
      />
    );
  }
}
