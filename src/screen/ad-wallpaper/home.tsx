import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  SafeAreaView,
} from 'react-navigation';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import WPCategory from './category';
import commonStyles from '../../variable/styles';
import WPPapersInCategory from './papers-in-category';
import StyleSheet from '../../utility/StyleSheet';
import {
  FrameConstants,
  ScreenID,
  STYLE_SIZE,
  STYLE_COLOR,
} from '../../variable';
import { IconNavButton } from '../../component/navigation-button';

interface Props {}

interface State {}

const tabs = ['推荐', '最新', '分类'];

export default class WPHome extends React.Component<
  Props & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '光点',
  });
  render() {
    return (
      <View style={commonStyles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={STYLE_COLOR.CONTAINER_BACKGROUND}
        />
        <ScrollableTabView
          renderTabBar={({
            goToPage,
            containerWidth,
            activeTab,
            scrollValue,
          }) => {
            const tabContainerWidth = (containerWidth || 0) * 0.4;
            const tabWidth = tabContainerWidth / tabs.length;
            return (
              <SafeAreaView style={styles.headerContainer}>
                <View style={{ flex: 1 }} />
                <View
                  style={[
                    styles.tabContainer,
                    {
                      width: tabContainerWidth,
                    },
                  ]}
                >
                  {tabs.map((tabLabel, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.tabCell}
                      onPress={() => goToPage && goToPage(index)}
                    >
                      <Text style={styles.tabTitle}>{tabLabel}</Text>
                    </TouchableOpacity>
                  ))}
                  <Animated.View
                    style={[
                      styles.tabIndicator,
                      {
                        width: tabWidth,
                        transform: [
                          {
                            translateX: scrollValue
                              ? scrollValue.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, tabWidth],
                                })
                              : undefined,
                          },
                        ],
                      },
                    ]}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <IconNavButton
                    type="ionicon"
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                    onPress={() => {
                      this.props.navigation.navigate(
                        ScreenID.AD_Wallpaper_Search
                      );
                    }}
                  />
                </View>
              </SafeAreaView>
            );
          }}
        >
          <WPPapersInCategory {...this.props} presetOrder="hot" />
          <WPPapersInCategory {...this.props} presetOrder="new" />
          <WPCategory {...this.props} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND,
    elevation: 4,
  },
  tabContainer: {
    height: FrameConstants.navBarHeight,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tabCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: STYLE_SIZE.SPACING_HALF,
    left: 0,
    height: 4,
    backgroundColor: STYLE_COLOR.THEME_COLOR,
  },
  tabTitle: {
    fontSize: 18,
    color: STYLE_COLOR.TEXT_MAIN,
  },
});
