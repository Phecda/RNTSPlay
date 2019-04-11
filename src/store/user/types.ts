export type UserState = Readonly<{
  phone: string | null;
}>;

export enum UserActionTypes {
  DID_LOGIN = '@@user/DID_LOGIN',
  WILL_LOGOUT = '@@user/WILL_LOGOUT',
}

import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
export type TUserAction = ActionType<typeof actions>;
