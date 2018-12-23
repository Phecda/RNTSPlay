import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import {
  ActionCell,
  ActionDualCell,
  ListSeperator,
} from '../../component/table-cell';
import commonStyles from '../../variable/styles';

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
        style={commonStyles.container}
        data={[
          {
            title: '样例',
            detailText: '详细文本',
            roundIcon: true,
            icon: {
              uri:
                'https://i0.hdslb.com/bfs/archive/ca717badbf1d974a8273aa6d34c8ef3cc6c70c30.jpg',
            },
            onPress: () => {},
          },
          {
            title: '样例',
            detailText: '详细文本',
            dualText: '双行文本',
            roundIcon: true,
            icon: {
              uri:
                'https://i0.hdslb.com/bfs/archive/ca717badbf1d974a8273aa6d34c8ef3cc6c70c30.jpg',
            },
            onPress: () => {},
          },
        ]}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          if ('dualText' in item) return <ActionDualCell {...item} />;
          return <ActionCell {...item} />;
        }}
        ItemSeparatorComponent={() => <ListSeperator />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
