import React from 'react';
import { View, FlatList, Platform } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import RNDeviceInfo from 'react-native-device-info';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';
import { ListSeparator } from '../../component/table-cell';
import checkPermission from '../../utility/permission-android';
import Toast from '../../component/toast';
import { FrameConstants } from '../../variable';
import { ListItem } from 'react-native-elements';

interface Props {}

interface State {}

export default class DeviceInfo extends React.Component<
  Props & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '设备信息',
  });

  render() {
    const data = [
      {
        title: 'Brand',
        detailText: RNDeviceInfo.getBrand(),
      },
      {
        title: 'App Name',
        detailText: RNDeviceInfo.getApplicationName(),
      },
      {
        title: 'Bundle ID',
        detailText: RNDeviceInfo.getBundleId(),
      },
      {
        title: 'Device ID',
        detailText: RNDeviceInfo.getDeviceId(),
      },
      {
        title: 'Font Scale',
        detailText: RNDeviceInfo.getFontScale().toString(),
      },
      {
        title: 'Manufacturer',
        detailText: RNDeviceInfo.getManufacturer(),
      },
      {
        title: 'Time Zone',
        detailText: RNDeviceInfo.getTimezone(),
      },
      {
        title: 'User Agent',
        detailText: RNDeviceInfo.getUserAgent(),
      },
      {
        title: 'On Emulator',
        detailText: `${RNDeviceInfo.isEmulator()}`,
      },
      {
        title: 'Has Notch',
        detailText: `${RNDeviceInfo.hasNotch()}`,
      },
      {
        title: 'Supported ABIs',
        detailText: `${RNDeviceInfo.supportedABIs()}`,
      },
      {
        title: 'Carrier',
        detailText: RNDeviceInfo.getCarrier(),
      },
      {
        title: 'Device Name',
        detailText: RNDeviceInfo.getDeviceName(),
      },
      {
        title: 'IP Address',
        onPress: async () => {
          try {
            const ipaddr = await RNDeviceInfo.getIPAddress();
            Toast.showBottom(`IP: ${ipaddr}`);
          } catch (error) {
            Toast.showTop(error.message);
          }
        },
      },
      {
        title: 'Unique ID',
        detailText: RNDeviceInfo.getUniqueID(),
      },
    ];
    return (
      <FlatList
        style={commonStyles.container}
        contentContainerStyle={{ paddingBottom: FrameConstants.safeAreaBottom }}
        data={data}
        keyExtractor={(_, index) => `${index}`}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            rightTitle={item.detailText}
            onPress={item.onPress}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});
