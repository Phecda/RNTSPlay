import { Reducer } from 'redux';
import { UserState, TUserAction, UserActionTypes } from './types';

const initialState: UserState = {
  phone: null,
};

const reducer: Reducer<UserState, TUserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.DID_LOGIN:
      return { ...state, phone: action.payload };
    case UserActionTypes.WILL_LOGOUT:
      return { ...state, phone: null };
    default:
      return state;
  }
};

export default reducer;
