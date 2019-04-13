import { createStandardAction } from 'typesafe-actions';
import { UserActionTypes } from './types';

export const onDidLogin = createStandardAction(UserActionTypes.DID_LOGIN)<
  string
>();
export const onWillLogout = createStandardAction(UserActionTypes.WILL_LOGOUT)();
