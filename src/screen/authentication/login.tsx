import React from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProps, NavigationScreenOptions, SafeAreaView } from 'react-navigation';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';
import { Button, Input } from 'react-native-elements';

interface Props {}

interface State {}

export default class LoginPage extends React.Component<Props & NavigationScreenProps, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '登陆',
  });

  render() {
    return (
      <SafeAreaView style={[commonStyles.container]}>
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center' }} behavior="padding">
          <Input
            placeholder="Phone Number"
            keyboardType="phone-pad"
            returnKeyType="next"
            leftIcon={<Icon name="smartphone" size={16} color="#CCCCCC" />}
            leftIconContainerStyle={{ marginRight: 15 }}
            containerStyle={{ width: '80%' }}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={16} color="#CCCCCC" />}
            leftIconContainerStyle={{ marginRight: 15 }}
            containerStyle={{ width: '80%' }}
            inputContainerStyle={{}}
          />
          <Button title="确定" type="outline" containerStyle={{ width: '50%' }} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
