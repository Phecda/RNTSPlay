import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';

interface Prop {}

interface State {}

export default class SampleHome extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    title: '样例',
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

const styles = StyleSheet.create({
  container: {},
});
