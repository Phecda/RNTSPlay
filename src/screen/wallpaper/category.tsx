import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { WallpaperAPI } from '../../api';
import { ScreenID } from '../../variable';

interface Prop {}

interface State {
  categories: WallPaperCategoryProps[];
  loading: boolean;
}

export default class WPCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: '目录',
    };
  };

  state: State = {
    categories: [],
    loading: false,
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({ pushAll: this._pushPapers });
    this._requestCategoryList();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _requestCategoryList = () => {
    if (this.mounted) {
      this.setState({
        loading: true,
      });
    }
    return WallpaperAPI.fetchCategory({})
      .then(json => {
        if (this.mounted) {
          this.setState({
            categories: json.res.category,
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  _pushPapers = (category?: WallPaperCategoryProps) => {
    this.props.navigation.navigate(ScreenID.Wallpaper_Papers, {
      category: category,
    });
  };

  render() {
    const { categories, loading } = this.state;
    const { width } = Dimensions.get('window');
    const imgSize = width / 3;
    return (
      <FlatList
        data={categories}
        refreshing={loading}
        onRefresh={this._requestCategoryList}
        keyExtractor={item => item.id}
        numColumns={3}
        ListHeaderComponent={
          <View>
            <Button onPress={() => this._pushPapers()} title="全部壁纸" />
          </View>
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this._pushPapers(item)}
            >
              <Image
                source={{ uri: item.cover }}
                style={{ width: imgSize, height: imgSize }}
              />
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
