import { 
  KINGS_GAME_LOADED,
  KINGS_GAME_ERROR,
  KINGS_BET_SUCCESS,
  KINGS_BET_ERROR
} from './types';
import socket from '../services/socket';

// Load current kings game
export const loadKingsGame = () => dispatch => {
  try {
    socket.emit('kings:getGame');
    
    socket.on('kings:gameData', game => {
      dispatch({
        type: KINGS_GAME_LOADED,
        payload: game
      });
    });

    socket.on('kings:error', error => {
      dispatch({
        type: KINGS_GAME_ERROR,
        payload: error
      });
    });
  } catch (err) {
    dispatch({
      type: KINGS_GAME_ERROR,
      payload: { msg: 'Failed to load game' }
    });
  }
};

// Place bet in kings game
export const placeBet = (amount) => dispatch => {
  try {
    socket.emit('kings:placeBet', { amount });

    socket.on('kings:betSuccess', data => {
      dispatch({
        type: KINGS_BET_SUCCESS,
        payload: data
      });
    });

    socket.on('kings:betError', error => {
      dispatch({
        type: KINGS_BET_ERROR,
        payload: error
      });
    });
  } catch (err) {
    dispatch({
      type: KINGS_BET_ERROR,
      payload: { msg: 'Failed to place bet' }
    });
  }
};
