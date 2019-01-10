import React from 'react';
import RootToast from './lib/root-toast';
import { FrameConstants, STYLE_SIZE } from '../../variable';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class Toast {
  static showBottom(message: string) {
    return RootToast.show(message, {
      position: {
        position: 'bottom',
        offset: FrameConstants.safeAreaBottom + 44 + STYLE_SIZE.SPACING_2,
      },
      duration: RootToast.durations.LONG,
    });
  }

  static showMiddle(
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) {
    const center = (
      <View style={styles.centerContainer}>
        <Image
          source={
            type === 'success'
              ? require('../../assets/toast/ico_toast_success.png')
              : type === 'error'
              ? require('../../assets/toast/ico_toast_fail.png')
              : require('../../assets/toast/ico_toast_alert.png')
          }
          style={styles.centerIcon}
        />
        <Text style={styles.centerText}>{message}</Text>
      </View>
    );
    return RootToast.show(center, {
      position: {
        position: 'middle',
        offset: 0,
      },
      duration: RootToast.durations.LONG,
    });
  }

  static showTop(message: string, isSuccess: boolean = false) {
    let containerHeight = FrameConstants.navBarHeight;
    let paddingTop = 0;
    if (Platform.OS === 'ios') {
      paddingTop = FrameConstants.safeAreaTop + FrameConstants.statusBarHeight;
      containerHeight += paddingTop;
    }
    const core = (
      <SafeAreaView
        style={{
          flex: 1,
        }}
        forceInset={{
          top: 'always',
          left: 'always',
          right: 'always',
        }}
      >
        <View
          style={{
            height: FrameConstants.navBarHeight,
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: STYLE_SIZE.SPACING_2,
          }}
        >
          <Image
            style={styles.topIcon}
            source={
              isSuccess
                ? require('../../assets/toast/ico_toast_top_success.png')
                : require('../../assets/toast/ico_toast_warning.png')
            }
          />
          <Text style={styles.topText} numberOfLines={1}>
            {message}
          </Text>
        </View>
      </SafeAreaView>
    );
    return RootToast.show(core, {
      position: {
        position: 'top',
        offset: 0,
      },
      duration: RootToast.durations.LONG,
      shadow: false,
      backgroundColor: isSuccess ? '#00CB6B' : '#FF6C6C',
      opacity: 1,
      containerStyle: {
        borderRadius: 0,
        padding: 0,
      },
    });
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIcon: {
    width: 44,
    height: 44,
  },
  centerText: {
    color: 'white',
    marginTop: STYLE_SIZE.SPACING_1,
  },
  topText: {
    color: 'white',
  },
  topIcon: {
    marginRight: STYLE_SIZE.SPACING_1,
  },
});
