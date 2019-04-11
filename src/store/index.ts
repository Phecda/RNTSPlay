import { UserState, userReducer, UserAction } from './user';
import { combineReducers } from 'redux';

export interface ApplicationState {
  user: UserState;
}

export type RootAction = UserAction;

export const rootReducer = combineReducers<ApplicationState, RootAction>({
  user: userReducer,
});
