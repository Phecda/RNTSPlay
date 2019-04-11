import { UserState, userReducer, TUserAction } from './user';
import { combineReducers } from 'redux';

export interface ApplicationState {
  user: UserState;
}

export type RootAction = TUserAction;

export const rootReducer = combineReducers<ApplicationState, RootAction>({
  user: userReducer,
});

export { default as withReduxState } from './withMappedReduxState';
