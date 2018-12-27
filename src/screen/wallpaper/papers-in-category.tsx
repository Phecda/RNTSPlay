import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper';
import { WallpaperAPI } from '../../api';
import commonStyles from '../../variable/styles';
import ImageViewerModal from './image-viewer-modal';
import { showActionSheet } from '../../utility/pop-view';
import { ScreenID } from '../../variable';
import Toast from '../../component/toast';

interface Prop {
  category?: WallPaperCategoryProps;
}

interface State {
  wallpapers: WallPaperProps[];
  loading: boolean;
  refreshing: boolean;
  image: WallPaperProps | null;
  orderIndex: number;
}

type Order = 'hot' | 'new';

const options = [
  { key: 'hot', value: '最热门' },
  { key: 'new', value: '最新' },
];

@withMappedNavigationAndConfigProps()
export default class WPPapersInCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    category,
    navigation,
  }: any): NavigationScreenOptions => ({
    title: category ? category.name : '全部类别',
    headerRight: (
      <Button
        onPress={navigation.getParam('showOrderSelector', () => {})}
        title={navigation.getParam('order', options[0].value)}
      />
    ),
  });

  state: State = {
    wallpapers: [],
    image: null,
    loading: false,
    refreshing: false,
    orderIndex: 0,
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({
      showOrderSelector: this._showOrderSelector,
    });
    this.props.navigation.setParams({
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

    return WallpaperAPI.fetchWallpapersInCategory(
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
    showActionSheet({
      title: '选择排序',
      onSelect: index => {
        this.setState({ orderIndex: index });
      },
      options: options.map(option => option.value),
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
                  this.props.navigation.navigate(ScreenID.Wallpaper_Detail, {
                    image: item,
                  });
                }}
              >
                <Image
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
