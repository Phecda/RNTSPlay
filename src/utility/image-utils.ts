import { Platform, CameraRoll } from 'react-native';
import checkPermission from './permission-android';
import RNFS from 'react-native-fs';

export function downloadRemoteFile() {}

export function saveRemoteImage(uri: string) {
  if (Platform.OS === 'ios') {
    return CameraRoll.saveToCameraRoll(uri, 'photo');
  } else {
    return checkPermission(['android.permission.WRITE_EXTERNAL_STORAGE']).then(
      () => {
        const dlDest = `${
          RNFS.TemporaryDirectoryPath
        }/dowload-${Date.now()}.png`;
        return RNFS.downloadFile({
          fromUrl: uri,
          toFile: dlDest,
        }).promise.then(result => {
          return CameraRoll.saveToCameraRoll('file://' + dlDest, 'photo');
        });
      }
    );
  }
}
