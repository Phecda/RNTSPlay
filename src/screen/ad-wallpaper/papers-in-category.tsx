import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper';
import { ADWallpaperAPI } from '../../api';
import commonStyles from '../../variable/styles';
import { ScreenID } from '../../variable';
import Toast from '../../component/toast';
import { IconNavButton } from '../../component/navigation-button';
import RNND from 'react-native-native-dialogs';

interface Prop {
  category?: ADWallpaperAPI.Category;
  presetOrder?: Order;
}

interface State {
  wallpapers: ADWallpaperAPI.WallPaper[];
  loading: boolean;
  refreshing: boolean;
  image: ADWallpaperAPI.WallPaper | null;
  orderIndex: number;
}

type Order = 'hot' | 'new';

const options = [{ key: 'new', value: '最新' }, { key: 'hot', value: '最热门' }];

@withMappedNavigationAndConfigProps()
export default class WPPapersInCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    category,
    navigation,
  }: Prop & NavigationScreenProps): NavigationScreenOptions => ({
    title: category ? category.name : '全部类别',
    headerRight: (
      <IconNavButton
        name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
        type="ionicon"
        onPress={navigation.getParam('showOrderSelector', () => {})}
      />
    ),
  });

  state: State = {
    wallpapers: [],
    image: null,
    loading: false,
    refreshing: false,
    orderIndex: this.props.presetOrder
      ? options.findIndex(item => item.key === this.props.presetOrder)
      : 0,
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({
      showOrderSelector: this._showOrderSelector,
      order: options[this.state.orderIndex].value,
    });
    this._requestData(true);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: Prop, prevState: State) {
    if (prevState.orderIndex !== this.state.orderIndex) {
      this.props.navigation.setParams({
        order: options[this.state.orderIndex].value,
      });
      this._requestData(true);
    }
  }

  _requestData = (refresh: boolean) => {
    const { category } = this.props;
    const { wallpapers, loading, refreshing, orderIndex } = this.state;
    if (loading || refreshing) return;
    const key = refresh ? 'refreshing' : 'loading';
    const loadingState: any = { [key]: true };
    const loadedState: any = { [key]: false };
    this.setState({
      ...loadingState,
    });

    return ADWallpaperAPI.fetchWallpapersInCategory(
      {
        order: options[this.state.orderIndex].key as Order,
        offset: refresh ? 0 : wallpapers.length,
        // adult: true,
      },
      category ? category.id : undefined
    )
      .then(res => {
        const newPapers = res.vertical;
        this.setState({
          wallpapers: refresh ? newPapers : wallpapers.concat(newPapers),
          ...loadedState,
        });
      })
      .catch(err => {
        this.setState({ ...loadedState });
        Toast.showBottom(err.message);
      });
  };

  _showOrderSelector = () => {
    RNND.showActionSheet({
      title: '选择排序',
      options: options.map(opt => opt.value),
      selectedIndex: this.state.orderIndex,
      onSelect: ({ index }) => {
        this.setState({ orderIndex: index });
      },
    });
  };

  render() {
    const { refreshing, wallpapers, image } = this.state;
    const { width } = Dimensions.get('window');
    const imgSize = width / 3;
    return (
      <View style={commonStyles.container}>
        <FlatList
          numColumns={3}
          removeClippedSubviews={Platform.OS === 'android'}
          refreshing={refreshing}
          onRefresh={() => this._requestData(true)}
          onEndReached={() => this._requestData(false)}
          data={wallpapers}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ width: imgSize, height: imgSize * 1.5 }}
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate(ScreenID.AD_Wallpaper_Detail, {
                    image: item,
                  });
                }}
              >
                <FastImage
                  style={{ width: imgSize, height: imgSize * 1.5 }}
                  source={{ uri: item.thumb }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
