import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { ActionCell } from '../../component/table-cell';

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
      <FlatList
        data={[
          {
            title: '样例',
            detailText: '详细文本',
          },
        ]}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          return <ActionCell {...item} />;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
