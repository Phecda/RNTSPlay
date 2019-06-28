import React from 'react';
import { View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenOptions,
} from 'react-navigation';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';
import { ThemeConsumer, ListItem, colors, Button } from 'react-native-elements';
import RNEThemes from '../../variable/theme';

interface Props {}

interface State {}

export default class ThemeSelectPage extends React.Component<
  Props & NavigationScreenProps,
  State
> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '主题',
  });

  render() {
    return (
      <ThemeConsumer>
        {({ theme, updateTheme }) => {
          console.log(theme);
          return (
            <View style={commonStyles.container}>
              <ListItem
                title="dark"
                onPress={() => {
                  updateTheme(RNEThemes.dark);
                }}
              />
              <ListItem
                title="light"
                onPress={() => {
                  updateTheme(RNEThemes.light);
                }}
              />
              <Button title="Test" />
            </View>
          );
        }}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({});
