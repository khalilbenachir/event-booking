import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { connect } from 'react-redux';
import { logout } from '../redux/user/user-actions';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const ButtonAppBar=({token,handleLogOut})=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BOOKING
          </Typography>
          <ButtonGroup              
             variant="contained"
              color="primary"
              aria-label="full-width contained primary button group">
              <Button href='/event' >Events</Button>
              {token && <Button href='/booking'>Bookings</Button>}
              {!token && <Button href='/signup'>Signup</Button>}
              {!token && <Button  href='/signin'>Login</Button>}
              {token && <Button onClick={handleLogOut} >Logout</Button>}
              
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  token:state.user.userLoginInfo.token,
  userId:state.user.userLoginInfo.userId
});

const mapDispatchToProps = dispatch => (
  {
    handleLogOut: () => dispatch(logout()),
}
);

export default connect(mapStateToProps,mapDispatchToProps)(ButtonAppBar);