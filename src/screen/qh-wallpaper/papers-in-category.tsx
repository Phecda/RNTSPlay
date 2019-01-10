import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper';
import { QHWallpaperAPI } from '../../api';
import commonStyles from '../../variable/styles';
import { ScreenID, STYLE_SIZE } from '../../variable';
import Toast from '../../component/toast';

interface Prop {
  category: QHCategory;
}

interface State {
  wallpapers: QHWallpaper[];
  loading: boolean;
  refreshing: boolean;
  image: QHWallpaper | null;
  orderIndex: number;
}

@withMappedNavigationAndConfigProps()
export default class WPPapersInCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    category,
    navigation,
  }: any): NavigationScreenOptions => ({
    title: category.name,
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
    this._requestData(true);
  }

  componentWillUnmount() {
    this.mounted = false;
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

    return QHWallpaperAPI.fetchWallpapersInCategory(
      {
        offset: refresh ? 0 : wallpapers.length,
      },
      category.id
    )
      .then(res => {
        const newPapers = res.data;
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

  render() {
    const { refreshing, wallpapers, image } = this.state;
    const { width } = Dimensions.get('window');
    const imgSize = width - STYLE_SIZE.SPACING_2;
    return (
      <View style={commonStyles.container}>
        <FlatList
          refreshing={refreshing}
          onRefresh={() => this._requestData(true)}
          onEndReached={() => this._requestData(false)}
          data={wallpapers}
          keyExtractor={(item, index) => item.pid + index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ padding: STYLE_SIZE.SPACING_1 }}
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate(ScreenID.QH_Wallpaper_Detail, {
                    image: item,
                  });
                }}
              >
                <Image
                  style={{ width: imgSize, height: imgSize * 0.5625 }}
                  source={{ uri: item.url }}
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
