import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: "10px auto"
  },
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "91vh"
  },
  boxContainer: {
    padding: "3rem 5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f50057",
    borderRadius: 10,
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.4)"
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    outline:'none',
    padding: theme.spacing(2, 4, 3)
  },
  model__actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  model__title: {
    backgroundColor: "#f50057",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    borderRadius:8
  }
}));

export default function ContainedButtons() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.boxContainer}>
        <p>Share your own events</p>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleOpen}
        >
          Create event
        </Button>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 className={classes.model__title} id="simple-modal-title">Add event</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <div className={classes.model__actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Delete
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
