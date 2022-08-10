import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import rankingReducer from './rankingReducer';
import settingsReducer from './settingsReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  ranking: rankingReducer,
  token: tokenReducer,
  settings: settingsReducer,
});

export default rootReducer;
