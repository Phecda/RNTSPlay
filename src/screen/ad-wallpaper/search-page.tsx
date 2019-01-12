import React from 'react';
import { FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import StyleSheet from '../../utility/StyleSheet';
import { ScreenID } from '../../variable';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { ADWallpaperAPI } from '../../api';
import Toast from '../../component/toast';

interface Props {}

interface State {
  wallpapers: ADWallPaper[];
  loading: boolean;
  refreshing: boolean;
  image: ADWallPaper | null;
  searchText: string;
}

export default class WPSearch extends React.Component<
  Props & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    headerTitle: '搜索',
  });

  state: State = {
    wallpapers: [],
    image: null,
    loading: false,
    refreshing: false,
    searchText: '',
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _requestData = (refresh: boolean) => {
    const { wallpapers, loading, refreshing, searchText } = this.state;
    if (loading || refreshing) return;
    const key = refresh ? 'refreshing' : 'loading';
    const loadingState: any = { [key]: true };
    const loadedState: any = { [key]: false };
    this.setState({
      ...loadingState,
    });

    return ADWallpaperAPI.searchWallpaper(
      {
        offset: refresh ? 0 : wallpapers.length,
        order: 'new',
      },
      searchText
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

  render() {
    const { wallpapers, searchText, refreshing } = this.state;
    const { width } = Dimensions.get('window');
    const imgSize = width / 3;
    return (
      <FlatList
        numColumns={3}
        onEndReached={() => this._requestData(false)}
        data={wallpapers}
        keyExtractor={(item, index) => item.id + index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <SearchBar
            platform={'default'}
            lightTheme={true}
            inputStyle={{ fontSize: 16 }}
            cancelButtonProps={{ title: '取消' }}
            returnKeyType="search"
            defaultValue={searchText}
            showLoading={refreshing}
            autoFocus={true}
            onChangeText={text => {
              this.setState({ searchText: text });
            }}
            onSubmitEditing={() => this._requestData(true)}
          />
        }
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
              <Image
                style={{ width: imgSize, height: imgSize * 1.5 }}
                source={{ uri: item.thumb }}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
