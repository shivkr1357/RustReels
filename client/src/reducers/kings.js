import {
  KINGS_GAME_LOADED,
  KINGS_GAME_ERROR,
  KINGS_BET_SUCCESS,
  KINGS_BET_ERROR
} from '../actions/types';

const initialState = {
  game: null,
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case KINGS_GAME_LOADED:
      return {
        ...state,
        game: payload,
        loading: false,
        error: null
      };
    case KINGS_BET_SUCCESS:
      return {
        ...state,
        game: payload,
        error: null
      };
    case KINGS_GAME_ERROR:
    case KINGS_BET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
