import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import crownIcon from '../../assets/crown.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    height: '400px',
    background: 'rgba(39, 43, 47, 0.9)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  },
  avatarSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2),
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#1a1e23',
  },
  crownIcon: {
    width: 24,
    height: 24,
  },
  mainContent: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerBox: {
    width: '200px',
    height: '200px',
    background: '#1a1e23',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    background: '#1a1e23',
    borderRadius: 2,
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    '& > div': {
      height: '100%',
      background: '#4caf50',
      transition: 'width 0.3s ease',
    },
  },
  joinButton: {
    width: '100%',
    background: '#ff4d4d',
    color: 'white',
    borderRadius: 25,
    padding: theme.spacing(1),
    '&:hover': {
      background: '#ff3333',
    },
  },
  walletInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  itemsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: '#666',
    '& svg': {
      width: 16,
      height: 16,
    },
  },
}));

const GameCard = ({ player, onJoin, isWaiting = true }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.avatarSection}>
        <Avatar 
          src={player?.avatar} 
          className={classes.avatar}
        >
          {!player && <img src={crownIcon} alt="Crown" className={classes.crownIcon} />}
        </Avatar>
        <Typography variant="subtitle1" style={{ color: '#fff' }}>
          {player?.username || (isWaiting ? 'Waiting for king...' : 'Waiting for opponent...')}
        </Typography>
      </Box>

      <Box className={classes.walletInfo}>
        <Typography variant="body2" style={{ color: '#4caf50' }}>
          ${player?.wallet || '0.00'}
        </Typography>
        <Box className={classes.itemsBox}>
          <Box component="span" style={{ color: '#666' }}>0 Items</Box>
        </Box>
      </Box>

      <Box className={classes.mainContent}>
        <Box className={classes.playerBox}>
          {!player && <img src={crownIcon} alt="Crown" style={{ width: 48, height: 48, opacity: 0.5 }} />}
        </Box>
        <Box className={classes.progressBar}>
          <Box style={{ width: '0%' }} />
        </Box>
        {!player && (
          <Button 
            className={classes.joinButton}
            onClick={onJoin}
          >
            Join
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GameCard;
