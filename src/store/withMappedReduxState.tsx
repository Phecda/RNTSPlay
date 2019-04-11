import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '.';
import { Dispatch } from 'redux';

type PropsFromState = ApplicationState;
interface PropsFromDispatch {
  dispatch: Dispatch;
}

export default <P extends object>(wrappedComponent: React.ComponentClass<P>) => {
  return connect<PropsFromState, PropsFromDispatch, P, ApplicationState>(
    state => ({ ...state }),
    dispatch => ({ dispatch })
  )(wrappedComponent as any);
};
