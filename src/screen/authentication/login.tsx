import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  SafeAreaView,
} from 'react-navigation';
import { Button } from 'react-native-elements';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';
import { ScreenID } from '../../variable';
import AuthInput from './input';
import withMappedReduxState, {
  PropsFromDispatch,
} from '../../store/withMappedReduxState';
import { userActions } from '../../store/user';

interface Props {}

interface State {
  phone: string;
  password: string;
}

class LoginPage extends React.Component<
  Props & NavigationScreenProps & PropsFromDispatch,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '登陆',
  });

  state: State = {
    phone: '',
    password: '',
  };
  pwdInput: AuthInput | null = null;

  private onSetPhone = (phone: string) => {
    this.setState({ phone });
  };

  private onSetPwd = (password: string) => {
    this.setState({ password });
  };

  private onSubmit = () => {
    this.props.dispatch(userActions.onDidLogin(this.state.phone));
    this.props.navigation.navigate(ScreenID.APP_AUTH_LOADING);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={commonStyles.container}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 100, height: 100 }}
            />
            <AuthInput
              featherIcon="user"
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              maxLength={11}
              clearButtonMode="while-editing"
              defaultValue={this.state.phone}
              onChangeText={this.onSetPhone}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.pwdInput!.focus();
              }}
            />
            <AuthInput
              ref={ai => (this.pwdInput = ai)}
              featherIcon="lock"
              secureTextEntry={true}
              textContentType="password"
              defaultValue={this.state.password}
              onChangeText={this.onSetPwd}
              returnKeyType="send"
            />
          </KeyboardAvoidingView>
          <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            <Button
              title="提交"
              type="outline"
              disabled={!this.state.phone}
              onPress={this.onSubmit}
              containerStyle={{ width: '50%' }}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({});

export default withMappedReduxState(LoginPage);
