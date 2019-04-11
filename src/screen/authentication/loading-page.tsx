import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import commonStyles from '../../variable/styles';
import StyleSheet from '../../utility/StyleSheet';
import { withReduxState } from '../../store';
import { Dispatch } from 'redux';
import { UserState } from '../../store/user';
import { ScreenID } from '../../variable';

interface PropsFromState {
  user: UserState;
}

interface PropsFromDispatch {
  dispatch: Dispatch;
}

interface Props {}

interface State {}

class AuthenticationLoading extends React.Component<
  Props & NavigationScreenProps & PropsFromState & PropsFromDispatch,
  State
> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    header: null,
  });

  constructor(props: any) {
    super(props);
    this.handleNavigation();
  }

  private handleNavigation = () => {
    const { user, navigation } = this.props;
    if (user.phone === null) {
      navigation.navigate(ScreenID.AUTH_LOGIN);
    } else {
      navigation.navigate(ScreenID.App_Main_Stack);
    }
  };

  render() {
    return (
      <View style={[commonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator />
        <Text>请稍候</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withReduxState(AuthenticationLoading);
