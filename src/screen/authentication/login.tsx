import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';

interface Props {}

interface State {}

export default class LoginPage extends React.Component<Props & NavigationScreenProps, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '登陆',
  });

  render() {
    return <View style={commonStyles.container} />;
  }
}

const styles = StyleSheet.create({});
