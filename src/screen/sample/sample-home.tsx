import React from 'react';
import { StyleSheet, SectionList, View, Text } from 'react-native';
import Config from 'react-native-config';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  SafeAreaView,
} from 'react-navigation';
import { ListSeparator } from '../../component/table-cell';
import commonStyles from '../../variable/styles';
import { STYLE_SIZE, STYLE_COLOR, ScreenID } from '../../variable';
import Toast from '../../component/toast';
import withMappedReduxState, {
  PropsFromDispatch,
} from '../../store/withMappedReduxState';
import { userActions } from '../../store/user';
import { ListItem } from 'react-native-elements';

interface Prop {}

interface State {
  promptKeyboardType: string;
}

class SampleHome extends React.Component<
  Prop & NavigationScreenProps & PropsFromDispatch,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    title: '样例',
  };
  state: State = {
    promptKeyboardType: '',
  };
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
                title: 'Toast Bottom',
                onPress: () => {
                  Toast.showBottom('昨夜闲潭梦落花，可怜春半不还家');
                },
              },
              {
                title: 'Toast Center',
                onPress: () => {
                  Toast.showMiddle('警告提示');
                },
              },
              {
                title: 'Toast Top',
                onPress: () => {
                  Toast.showTop(Config.VERSION);
                },
              },
            ],
          },
          {
            sectionHeaderText: 'Modules',
            data: [
              {
                title: 'Device Info',
                onPress: () => {
                  this.props.navigation.navigate(ScreenID.Sample_Device_Info);
                },
              },
              {
                title: 'Theme',
                onPress: () => {
                  this.props.navigation.navigate(ScreenID.Sample_Theme_Picker);
                },
              },
            ],
          },
          {
            sectionHeaderText: '',
            data: [
              {
                title: '注销',
                onPress: () => {
                  this.props.dispatch(userActions.onWillLogout());
                  this.props.navigation.navigate(ScreenID.APP_AUTH_LOADING);
                },
              },
            ],
          },
        ]}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.title}
              subtitle={item.dualText}
              rightTitle={item.detailText}
              leftAvatar={item.icon ? { source: item.icon } : undefined}
              onPress={item.onPress}
            />
          );
        }}
        ItemSeparatorComponent={({ highlighted }) => {
          return <ListSeparator highlighted={highlighted} />;
        }}
        SectionSeparatorComponent={({ leadingItem, trailingItem, section }) => {
          if (!leadingItem && trailingItem && section.sectionHeaderText) {
            return (
              <SafeAreaView
                style={styles.sectionMargin}
                forceInset={{ top: 'never', bottom: 'never' }}
              >
                <Text style={styles.sectionMarginText}>
                  {section.sectionHeaderText}
                </Text>
              </SafeAreaView>
            );
          } else if (
            leadingItem &&
            !trailingItem &&
            section.sectionFooterText
          ) {
            return (
              <SafeAreaView
                style={styles.sectionMargin}
                forceInset={{ top: 'never', bottom: 'never' }}
              >
                <Text style={styles.sectionMarginText}>
                  {section.sectionFooterText}
                </Text>
              </SafeAreaView>
            );
          }
          return null;
        }}
        renderSectionHeader={() => (
          <View style={{ height: STYLE_SIZE.SPACING_1 }} />
        )}
        renderSectionFooter={() => (
          <View style={{ height: STYLE_SIZE.SPACING_1 }} />
        )}
        style={commonStyles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  sectionMargin: {
    padding: STYLE_SIZE.SPACING_HALF,
    paddingHorizontal: STYLE_SIZE.SPACING_2,
  },
  sectionMarginText: {
    fontSize: STYLE_SIZE.FONT_SECONDARY,
    color: STYLE_COLOR.TEXT_SECONDARY,
  },
});

export default withMappedReduxState(SampleHome);
