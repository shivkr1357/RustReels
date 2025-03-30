import React from 'react';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    backgroundColor: '#201520',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  middleSection: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  activeGames: {
    fontSize: 18,
    color: '#9C27B0',
    fontWeight: 500,
  },
  createButton: {
    backgroundColor: '#1A1A1A',
    color: '#FFC107',
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
    border: '1px solid rgba(255, 193, 7, 0.3)',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#2A2A2A',
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    transform: 'rotate(45deg)',
  },
}));

const CaseBattlesHeader = ({ activeGamesCount = 3 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.leftSection}>
        <Typography variant="h2" className={classes.title}>
          Case Battles
        </Typography>
      </Box>

      <Box className={classes.middleSection}>
        <Typography variant="h3" className={classes.title}>
          Case Battles
        </Typography>
        <Typography variant="subtitle1" className={classes.activeGames}>
          {activeGamesCount} Active Games
        </Typography>
      </Box>

      <Button
        variant="contained"
        className={classes.createButton}
        startIcon={<AddIcon className={classes.buttonIcon} />}
      >
        Create Battle
      </Button>
    </Box>
  );
};

export default CaseBattlesHeader;