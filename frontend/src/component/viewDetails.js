import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

import { handleBookEvent } from "../redux/user/user-actions";
import { connect } from "react-redux";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: theme.spacing(2, 4, 3)
  },
  model__actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  model__title: {
    backgroundColor: "#f50057",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    margin: "10px",
    borderRadius: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
  },
  model__description: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

const ViewDetails = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const { title, description, _id } = props.event;
  const { open, handleClose, handleBookEvent, token } = props;

  return (
    <div>
      {console.log("-----------_id__-------------", _id)}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div>
            <Paper className={classes.root}>
              <Typography
                className={classes.model__title}
                variant="h5"
                component="h3"
              >
                {title.toUpperCase()}
              </Typography>
              <Typography className={classes.model__description} component="p">
                {description}
              </Typography>
            </Paper>
          </div>
          <div className={classes.model__actions}>
            {token && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                onClick={() => handleBookEvent(_id)}
              >
                Book
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleClose}
            >
              Cancel
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.user.userLoginInfo.token
});

const mapDispatchToProps = dispatch => ({
  handleBookEvent: id => dispatch(handleBookEvent(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDetails);
