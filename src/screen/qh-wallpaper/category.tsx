import React from 'react';
import { FlatList } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import StyleSheet from '../../utility/StyleSheet';
import { QHWallpaperAPI } from '../../api';
import Toast from '../../component/toast';
import { ActionCell, ListSeparator } from '../../component/table-cell';
import commonStyles from '../../variable/styles';
import { ScreenID } from '../../variable';

interface Prop {}

interface State {
  categories: QHCategory[];
  loading: boolean;
}

export default class WPCategory extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions: NavigationScreenOptions = {
    title: '360壁纸',
  };

  state: State = {
    categories: [],
    loading: false,
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
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
    QHWallpaperAPI.fetchCategories()
      .then(res => {
        if (this.mounted) {
          this.setState({
            categories: res.data,
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

  render() {
    const { loading, categories } = this.state;
    return (
      <FlatList
        data={categories}
        style={commonStyles.container}
        refreshing={loading}
        onRefresh={this._requestCategoryList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ActionCell
            title={item.name}
            detailText={item.totalcnt}
            onPress={() => {
              this.props.navigation.navigate(ScreenID.QH_Wallpaper_Papers, {
                category: item,
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <ListSeparator />}
      />
    );
  }
}

const styles = StyleSheet.create({});
