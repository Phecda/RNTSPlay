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
import { ADWallpaperAPI } from '../../api';
import { ScreenID, STYLE_SIZE } from '../../variable';
import commonStyles from '../../variable/styles';
import Toast from '../../component/toast';

interface Prop {}

interface State {
  categories: ADWallPaperCategory[];
  loading: boolean;
}

export default class WPCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: '光点',
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
    ADWallpaperAPI.fetchCategory({})
      .then(res => {
        if (this.mounted) {
          this.setState({
            categories: res.category,
            loading: false,
          });
        }
      })
      .catch(err => {
        if (this.mounted) {
          this.setState({ loading: false });
        }
        Toast.showBottom(err.message);
      });
  };

  _pushPapers = (category?: ADWallPaperCategory) => {
    this.props.navigation.navigate(ScreenID.AD_Wallpaper_Papers, {
      category,
    });
  };

  render() {
    const { categories, loading } = this.state;
    const { width } = Dimensions.get('window');
    const cellWidth = width / 3;

    const imgSize = cellWidth - STYLE_SIZE.SPACING_HALF * 2;
    return (
      <FlatList
        data={categories}
        style={commonStyles.container}
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
              style={{
                paddingHorizontal: STYLE_SIZE.SPACING_HALF,
                paddingVertical: STYLE_SIZE.SPACING_1,
                alignItems: 'center',
              }}
              onPress={() => this._pushPapers(item)}
            >
              <Image
                source={{ uri: item.cover }}
                style={{
                  width: imgSize,
                  height: imgSize * 1.2,
                  borderRadius: 4,
                }}
              />
              <Text style={{ marginTop: STYLE_SIZE.SPACING_HALF }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
