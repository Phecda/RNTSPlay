import React from 'react';
import { StyleSheet, SectionList, View, Text } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import {
  ActionCell,
  ActionDualCell,
  ListSeparator,
} from '../../component/table-cell';
import commonStyles from '../../variable/styles';
import { STYLE_SIZE } from '../../variable';
import Toast from '../../component/toast';

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
      <SectionList
        sections={[
          {
            sectionHeaderText: 'Table Cell',
            data: [
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
                title: '样例样例样例样例样例样例样例样例样例样例样例样例样例',
                detailText:
                  '详细文本详细文本详细文本详细文本详细文本详细文本详细文本详细文本详细文本',
                dualText:
                  '双行文本双行文本双行文本双行文本双行文本双行文本双行文本双行文本',
                roundIcon: true,
                icon: {
                  uri:
                    'https://i0.hdslb.com/bfs/archive/ca717badbf1d974a8273aa6d34c8ef3cc6c70c30.jpg',
                },
                onPress: () => {},
              },
              {
                title: '样例样例样例样例样例样例样例样例样例样例样例样例样例',
                dualText:
                  '双行文本双行文本双行文本双行文本双行文本双行文本双行文本双行文本',
                roundIcon: true,
                icon: {
                  uri:
                    'https://i0.hdslb.com/bfs/archive/ca717badbf1d974a8273aa6d34c8ef3cc6c70c30.jpg',
                },
                onPress: () => {},
              },
            ],
          },
          {
            sectionHeaderText: 'Toast',
            data: [
              {
                title: 'Toast',
                onPress: () => {
                  Toast.showBottom('昨夜闲潭梦落花，可怜春半不还家');
                },
              },
            ],
          },
        ]}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          if ('dualText' in item) return <ActionDualCell {...item} />;
          return <ActionCell {...item} />;
        }}
        ItemSeparatorComponent={() => <ListSeparator />}
        SectionSeparatorComponent={() => (
          <View style={{ height: STYLE_SIZE.SPACING_1 }}>
            <Text>base</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => {
          if (section.sectionHeaderText) {
            return <Text>{section.sectionHeaderText}</Text>;
          }
          return null;
        }}
        renderSectionFooter={({ section }) => {
          if (section.sectionHeaderText) {
            return <Text>{section.sectionHeaderText}</Text>;
          }
          return null;
        }}
        style={commonStyles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
