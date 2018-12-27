import React from 'react';
import { View, Text } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import StyleSheet from '../../utility/StyleSheet';

interface Prop {}

interface State {}

export default class ClassName extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    title: '360壁纸',
  };
  state: State = {};
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <View>
        <Text>example</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
