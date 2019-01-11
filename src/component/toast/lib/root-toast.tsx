import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { durations, ToastOptions } from './toast-container';

class RootToast extends Component<ToastOptions> {
  static displayName = 'Toast';
  static durations = durations;

  static show = (
    message: string | JSX.Element,
    options: ToastOptions = { duration: durations.SHORT }
  ) => {
    let manager: RootSiblings;
    manager = new RootSiblings(
      (
        <ToastContainer
          {...options}
          visible={true}
          onHidden={() => {
            manager.destroy();
          }}
        >
          {message}
        </ToastContainer>
      )
    );
    return manager;
  };

  static hide = (toast: RootSiblings) => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`
      );
    }
  };

  _toast: RootSiblings | null = null;

  componentDidMount = () => {
    this._toast = new RootSiblings(
      <ToastContainer {...this.props} duration={0} />
    );
  };

  componentDidUpdate = () => {
    this._toast &&
      this._toast.update(<ToastContainer {...this.props} duration={0} />);
  };

  componentWillUnmount = () => {
    this._toast && this._toast.destroy();
  };

  render() {
    return null;
  }
}

export { RootSiblings as Manager };
export default RootToast;
