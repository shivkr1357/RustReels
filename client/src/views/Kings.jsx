import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';

// MUI Components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

// Services
import { kingsSocket } from '../services/websocket.service';

// Assets
import coinIcon from '../assets/coin.svg';
import crownIcon from '../assets/crown.svg';
import skullIcon from '../assets/skull.svg';
import defaultAvatar from '../assets/default-avatar.svg';

const MAX_HEALTH_MULTIPLIER = 100;
const ENTRY_FEE = 100;

const Kings = ({ user, isConnected, isAuthenticated }) => {
  const { addToast } = useToasts();
  const [gameState, setGameState] = useState({
    players: [],
    joinable: true,
    timeLeft: 30,
    winner: null,
    king: null,
    challenger: null,
    status: 'waiting',
    kingBounty: 0,
    playersInQueue: [],
    provablyFair: true,
    roundNumber: 0,
    items: {
      king: [],
      challenger: []
    }
  });
  const [isMuted, setIsMuted] = useState(false);

  // Check if current user is king or challenger
  const isKing = user && gameState.king && gameState.king.userId === user.id;
  const isChallenger = user && gameState.challenger && gameState.challenger.userId === user.id;
  const canJoin = isAuthenticated && isConnected && !isKing && !isChallenger && gameState.joinable;

  // Debug logging
  console.log('[Kings] Button state:', {
    isConnected,
    isAuthenticated,
    isKing,
    isChallenger,
    canJoin,
    gameState,
    user,
    socketConnected: kingsSocket?.connected
  });

  useEffect(() => {
    // Connect to socket when component mounts
    if (!kingsSocket.connected) {
      console.log('[Kings] Attempting to connect to socket...');
      kingsSocket.connect();
    }

    // Setup socket event listeners with a small delay
    setTimeout(() => {
      console.log('[Kings] Setting up event listeners...');
      
      kingsSocket.on('connect', () => {
        console.log('[Kings] Socket connected successfully');
      });

      kingsSocket.on('connect_error', (error) => {
        console.error('[Kings] Socket connection error:', error);
        addToast('Failed to connect to game server', { appearance: 'error' });
      });

      kingsSocket.on('game-state', (state) => {
        console.log('[Kings] Received game state:', state);
        setGameState(state);
      });

      kingsSocket.on('error', (error) => {
        console.error('[Kings] Socket error:', error);
        addToast(error.message || 'An error occurred', { appearance: 'error' });
      });
    }, 1000);  // 1 second delay

    // Cleanup
    return () => {
      console.log('[Kings] Cleaning up socket listeners');
      kingsSocket.off('connect');
      kingsSocket.off('connect_error');
      kingsSocket.off('game-state');
      kingsSocket.off('error');
      kingsSocket.disconnect();
    };
  }, [addToast]);

  const handleJoinGame = useCallback((position) => {
    console.log('[Kings] Joining as:', position);
    kingsSocket.emit('join-game', position);
  }, []);

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="game-container kings">
      <div className="game-header">
        <div className="game-title">
          <span className="title-text">King Round</span>
          <span className="prize-amount">Prize ${gameState?.kingBounty || "0.00"}</span>
        </div>
        <div className="players-in-queue">
          {gameState?.playersInQueue || 0} Players in Queue...
        </div>
      </div>

      <div className="game-content">
        {/* Left Player */}
        <div className="player-side left">
          <div className="player-header">
            <div className="player-icon">
              <img src={crownIcon} alt="Crown" />
              <span>Waiting for king...</span>
            </div>
          </div>
          <div className="player-stats">
            <div className="wager-info">
              <span className="amount">${gameState?.king?.wager || "0.00"}</span>
              <div className="items-count">
                <img src={coinIcon} alt="Items" />
                <span>{gameState?.king?.items?.length || 0} items</span>
              </div>
            </div>
          </div>
          <div className="player-slot">
            <div className="avatar-container">
              {gameState?.king ? (
                <img src={gameState.king.avatar || defaultAvatar} alt="King" className="player-avatar" />
              ) : (
                <div className="empty-slot">
                  <img src={crownIcon} alt="Crown" className="position-icon" />
                </div>
              )}
            </div>
            {!gameState?.king && (
              <button className="join-button" onClick={() => handleJoinGame('king')}>
                Join
              </button>
            )}
            <div className="progress-bar"></div>
          </div>
        </div>

        {/* Center Section */}
        <div className="center-section">
          <div className="bounty-card">
            <div className="bounty-header">
              <img src={crownIcon} alt="Crown" className="crown-icon" />
              <div className="bounty-amount">${gameState?.kingBounty || "0.00"}</div>
            </div>
            <div className="bounty-label">KING'S BOUNTY</div>
            <button className="join-button main" onClick={() => handleJoinGame('any')}>
              Join
            </button>
            <div className="provably-fair">
              Provably Fair
            </div>
          </div>
        </div>

        {/* Right Player */}
        <div className="player-side right">
          <div className="player-header">
            <div className="player-icon">
              <img src={skullIcon} alt="Skull" />
              <span>Waiting for opponent...</span>
            </div>
          </div>
          <div className="player-stats">
            <div className="wager-info">
              <span className="amount">${gameState?.challenger?.wager || "0.00"}</span>
              <div className="items-count">
                <img src={coinIcon} alt="Items" />
                <span>{gameState?.challenger?.items?.length || 0} items</span>
              </div>
            </div>
          </div>
          <div className="player-slot">
            <div className="avatar-container">
              {gameState?.challenger ? (
                <img src={gameState.challenger.avatar || defaultAvatar} alt="Challenger" className="player-avatar" />
              ) : (
                <div className="empty-slot">
                  <img src={skullIcon} alt="Skull" className="position-icon" />
                </div>
              )}
            </div>
            {!gameState?.challenger && gameState?.king && (
              <button className="join-button" onClick={() => handleJoinGame('challenger')}>
                Join
              </button>
            )}
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-container {
          width: 100%;
          height: 100vh;
          background: #0D1117;
          color: #fff;
          padding: 20px;
          position: relative;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .game-title {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .title-text {
          color: #ff4655;
          font-size: 1.2em;
          font-weight: 600;
        }

        .prize-amount {
          background: rgba(255, 70, 85, 0.2);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .players-in-queue {
          color: #ff4655;
          font-size: 0.9em;
        }

        .game-content {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          padding: 20px;
          height: calc(100% - 100px);
        }

        .player-side {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          position: relative;
        }

        .player-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .player-icon {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .player-icon img {
          width: 24px;
          height: 24px;
        }

        .player-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }

        .wager-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .amount {
          font-size: 1.2em;
          font-weight: 600;
        }

        .items-count {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #8b949e;
        }

        .items-count img {
          width: 16px;
          height: 16px;
        }

        .player-slot {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          position: relative;
        }

        .avatar-container {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .empty-slot {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 70, 85, 0.1);
        }

        .position-icon {
          width: 48px;
          height: 48px;
          opacity: 0.5;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #2d333b;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          display: block;
          height: 100%;
          width: 50%;
          background: #ff4655;
          border-radius: 2px;
        }

        .center-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }

        .bounty-card {
          background: rgba(255, 70, 85, 0.1);
          border: 1px solid rgba(255, 70, 85, 0.2);
          padding: 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          min-width: 250px;
        }

        .bounty-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .crown-icon {
          width: 32px;
          height: 32px;
        }

        .bounty-amount {
          font-size: 2em;
          font-weight: 700;
          color: #ff4655;
        }

        .bounty-label {
          color: #8b949e;
          font-size: 0.9em;
          text-transform: uppercase;
        }

        .join-button {
          background: #ff4655;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .join-button:hover {
          background: #ff5c69;
          transform: translateY(-1px);
        }

        .join-button.main {
          background: #4CAF50;
          padding: 12px 36px;
        }

        .join-button.main:hover {
          background: #45a049;
        }

        .provably-fair {
          color: #4CAF50;
          font-size: 0.8em;
          display: flex;
          align-items: center;
          gap: 5px;
          opacity: 0.8;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .player-side:hover {
          box-shadow: 0 0 20px rgba(255, 70, 85, 0.1);
        }

        .bounty-card:hover {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

Kings.propTypes = {
  user: PropTypes.object,
  isConnected: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isConnected: state.auth.isAuthenticated,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Kings);
