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
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper';
import { WallpaperAPI } from '../../api';

interface Prop {
  category?: WallPaperCategoryProps;
}

interface State {
  wallpapers: WallPaperProps[];
  loading: boolean;
  refreshing: boolean;
}

@withMappedNavigationAndConfigProps()
export default class WPPapersInCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({ category }: any): NavigationScreenOptions => ({
    title: category ? category.name : '全部类别',
  });

  state: State = {
    wallpapers: [],
    loading: false,
    refreshing: false,
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
    const { wallpapers, loading, refreshing } = this.state;
    if (loading || refreshing) return;
    const key = refresh ? 'refreshing' : 'loading';
    const loadingState: any = { [key]: true };
    const loadedState: any = { [key]: false };
    this.setState({
      ...loadingState,
    });

    return WallpaperAPI.fetchWallpapersInCategory(
      {
        order: 'hot',
        offset: refresh ? 0 : wallpapers.length,
        // adult: true,
      },
      category ? category.id : undefined
    )
      .then(json => {
        const newPapers = json.res.vertical;
        console.log(key, ' result:', newPapers);
        this.setState({
          wallpapers: refresh ? newPapers : wallpapers.concat(newPapers),
          ...loadedState,
        });
      })
      .catch(err => {
        this.setState({ ...loadedState });
        console.log(err);
      });
  };

  render() {
    const { refreshing, wallpapers } = this.state;
    const { width } = Dimensions.get('window');
    const imgSize = width / 3;
    return (
      <FlatList
        numColumns={3}
        refreshing={refreshing}
        onRefresh={() => this._requestData(true)}
        onEndReached={() => this._requestData(false)}
        data={wallpapers}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => {
          return (
            <Image
              style={{ width: imgSize, height: imgSize }}
              source={{ uri: item.thumb }}
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
