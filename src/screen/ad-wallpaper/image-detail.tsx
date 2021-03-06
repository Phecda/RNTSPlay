import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Button,
  SectionList,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { ADWallpaperAPI } from '../../api';
import { FrameConstants, STYLE_SIZE, STYLE_COLOR } from '../../variable';
import { ListSeparator } from '../../component/table-cell';
import commonStyles from '../../variable/styles';
import { saveRemoteImage } from '../../utility/image-utils';
import Toast from '../../component/toast';
import ImageViewerModal from '../../component/image-viewer-modal';
import { IconNavButton } from '../../component/navigation-button';

interface Prop {
  image: ADWallpaperAPI.WallPaper;
}

interface State {
  comments: ADWallpaperAPI.Comment[];
  hotComments: ADWallpaperAPI.Comment[];
  originSize?: {
    width: number;
    height: number;
  };
  modalVisible: boolean;
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
      <IconNavButton
        type="ionicon"
        name={Platform.OS === 'ios' ? 'ios-download' : 'md-download'}
        onPress={navigation.getParam('onSave', () => {})}
      />
    ),
  });
  state: State = {
    comments: [],
    modalVisible: false,
    hotComments: [],
  };
  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({ onSave: this._showSave });
    this._loadComment();
    this._loadSizeInfo();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _loadComment = () => {
    ADWallpaperAPI.fetchCommentOfWallpaper(this.props.image.id)
      .then(res => {
        if (this.mounted) {
          this.setState({ comments: res.comment, hotComments: res.hot });
        }
      })
      .catch(err => {
        //
        Toast.showBottom(err.message);
      });
  };

  _loadSizeInfo = () => {
    Image.getSize(
      this.props.image.preview,
      (width, height) => {
        if (this.mounted) {
          this.setState({
            originSize: {
              width,
              height,
            },
          });
        }
      },
      err => {
        Toast.showBottom(err.message);
      }
    );
  };

  _showSave = () => {
    const { image } = this.props;
    if (!image) return;
    saveRemoteImage(image.preview)
      .then(some => {
        Toast.showBottom('保存成功');
      })
      .catch(err => {
        Toast.showBottom(`保存失败，${err.message}`);
      });
  };

  render() {
    const { image } = this.props;
    const { comments, originSize, hotComments, modalVisible } = this.state;
    const { width } = Dimensions.get('window');
    const sections = [];
    if (hotComments.length) {
      sections.push({
        data: hotComments,
        sectionTitle: '热评',
      });
    }
    if (comments.length) {
      sections.push({
        data: comments,
        sectionTitle: '最新评论',
      });
    }
    return [
      <SectionList
        key="section"
        sections={sections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(_, i) => `${i}`}
        style={commonStyles.container}
        contentContainerStyle={{
          paddingBottom: FrameConstants.safeAreaBottom,
        }}
        renderSectionHeader={({ section }) => {
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>
                {section.sectionTitle}
              </Text>
            </View>
          );
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
          <ListSeparator leftWidth={STYLE_SIZE.SPACING_1_5} />
        )}
        ListHeaderComponent={() => {
          const date = new Date(image.atime * 1000);
          return (
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
              >
                <Image
                  source={{ uri: image.img }}
                  style={{
                    width,
                    height: width,
                  }}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
              <Text
                style={{ margin: STYLE_SIZE.SPACING_1, textAlign: 'center' }}
              >
                原图尺寸
                {originSize
                  ? `${originSize.width}*${originSize.height}`
                  : '载入中'}
              </Text>
              {!!image.user && (
                <View style={styles.commentCell}>
                  <View
                    style={[
                      styles.cellHeader,
                      { paddingBottom: STYLE_SIZE.SPACING_1_5 },
                    ]}
                  >
                    <Image
                      source={{ uri: image.user.avatar }}
                      style={styles.userAvatar}
                    />
                    <View style={styles.headerTextContainer}>
                      <Text style={styles.userName}>{image.user.name}</Text>
                      <Text
                        style={styles.commentTime}
                      >{`${date.getFullYear()}-${date.getMonth() +
                        1}-${date.getDay() +
                        1} ${date.getHours()}:${date.getMinutes() + 1}`}</Text>
                    </View>
                    <View style={styles.likeContainer}>
                      <Text style={styles.likeNumber}>
                        {image.user.follower}
                      </Text>
                      <FontAwesome name="heart-o" color="#ff8888" />
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />,
      <ImageViewerModal
        key="modal"
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
        imageUrl={this.props.image.preview}
      />,
    ];
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
  sectionHeader: {
    height: 44,
    backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    padding: STYLE_SIZE.SPACING_1_5,
    marginTop: STYLE_SIZE.SPACING_2,
    borderBottomColor: STYLE_COLOR.SEPARATOR_HEAVY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionHeaderText: {},
});
