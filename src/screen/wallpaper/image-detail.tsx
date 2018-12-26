import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
  SafeAreaView,
} from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { WallpaperAPI } from '../../api';
import { FrameConstants, STYLE_SIZE, STYLE_COLOR } from '../../variable';
import FullWidthImage from '../../component/full-width-image';
import {
  ActionCell,
  ActionDualCell,
  ListSeperator,
} from '../../component/table-cell';
import commonStyles from '../../variable/styles';
import { saveRemoteImage } from '../../utility/image-utils';
import Toast from '../../component/toast';

interface User {
  avatar: string;
  gender: number;
  name: string;
}

interface Comment {
  atime: number;
  content: string;
  user: User;
  size: number;
  reply_user: User | {};
}

interface Prop {
  image: WallPaperProps;
}

interface State {
  comments: Comment[];
}

@withMappedNavigationProps()
export default class WPImageDetail extends React.Component<
  Prop & NavigationScreenProps,
  State
> {
  static navigationOptions: (config: any) => NavigationScreenOptions = ({
    navigation,
  }) => ({
    title: '壁纸',
    headerRight: (
      <Button title="保存" onPress={navigation.getParam('onSave', () => {})} />
    ),
  });
  state: State = {
    comments: [],
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({ onSave: this._showSave });
    this.loadComment();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadComment = () => {
    WallpaperAPI.fetchCommentOfWallpaper(this.props.image.id)
      .then(res => {
        if (this.mounted) {
          this.setState({ comments: res.res.comment });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  _showSave = () => {
    const { image } = this.props;
    if (!image) return;
    saveRemoteImage(image.preview)
      .then(some => {
        Toast.showBottom('保存成功');
      })
      .catch(err => {
        console.log(err);
        Toast.showBottom(`保存失败，${err.message}`);
      });
  };

  render() {
    const { image } = this.props;
    const { comments } = this.state;
    const { width, height } = Dimensions.get('window');
    console.log(image);
    console.log(comments);
    return (
      <FlatList
        data={comments}
        keyExtractor={(_, i) => `${i}`}
        style={commonStyles.container}
        contentContainerStyle={{
          paddingBottom: FrameConstants.safeAreaBottom,
        }}
        renderItem={({ item }) => {
          const date = new Date(item.atime * 1000);

          return (
            <View style={styles.commentCell}>
              <View style={styles.cellHeader}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={styles.userAvatar}
                />
                <View style={styles.headerTextContainer}>
                  <Text style={styles.userName}>{item.user.name}</Text>
                  <Text
                    style={styles.commentTime}
                  >{`${date.getFullYear()}-${date.getMonth() +
                    1}-${date.getDay() +
                    1} ${date.getHours()}:${date.getMinutes() + 1}`}</Text>
                </View>
                <View style={styles.likeContainer}>
                  <Text style={styles.likeNumber}>{item.size}</Text>
                  <FontAwesome name="heart-o" color="#ff8888" />
                </View>
              </View>
              <View style={styles.commentContentContainer}>
                <Text style={styles.commentContent}>
                  {'name' in item.reply_user && (
                    <Text>回复 {item.reply_user.name} ：</Text>
                  )}
                  {item.content}
                </Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <ListSeperator leftWidth={STYLE_SIZE.SPACING_1_5} />
        )}
        ListHeaderComponent={
          <FullWidthImage
            source={{ uri: image.preview }}
            style={{
              width: width,
              height:
                height -
                FrameConstants.navBarHeight -
                FrameConstants.safeAreaTop -
                FrameConstants.statusBarHeight,
            }}
            resizeMode="contain"
          />
        }
      />
    );
  }
}

const iconSize = STYLE_SIZE.ICON_S;
const styles = StyleSheet.create({
  commentCell: { backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND },
  cellHeader: {
    flexDirection: 'row',
    padding: STYLE_SIZE.SPACING_1_5,
    paddingBottom: STYLE_SIZE.SPACING_HALF,
  },
  headerTextContainer: {
    flex: 1,
  },
  userAvatar: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    marginRight: STYLE_SIZE.SPACING_1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: STYLE_SIZE.FONT_MAIN,
  },
  commentTime: {
    color: STYLE_COLOR.TEXT_SECONDARY,
    fontSize: STYLE_SIZE.FONT_SECONDARY,
  },
  commentContentContainer: {
    padding: STYLE_SIZE.SPACING_1_5,
    paddingTop: STYLE_SIZE.SPACING_1_5,
  },
  commentContent: {},
  likeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeNumber: {
    fontSize: STYLE_SIZE.FONT_SMALL_COMMENT,
    color: STYLE_COLOR.TEXT_GREY,
  },
});
