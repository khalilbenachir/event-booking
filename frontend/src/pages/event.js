import React from "react";
import { Button, Grid, TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { connect } from "react-redux";
import {
  handleUserInput,
  handleDateInput,
  handleCreateEvent,
  handleAmountInput
} from "../redux/user/user-actions";

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
    borderRadius: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
  },
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
    justifyContent: "flex-end",
    marginTop: "10px"
  },
  model__title: {
    backgroundColor: "#f50057",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    borderRadius: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
  }
}));

const EventComponent = ({
  handleInput,
  handleDateInput,
  handleEvent,
  handleamountInput
}) => {
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
          <h2 className={classes.model__title} id="simple-modal-title">
            Add event
          </h2>
          <form className={classes.form} onSubmit={handleEvent}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleInput}
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-adornment-amount"
                label="Amount"
                required
                type="number"
                name="amount"
                fullWidth
                margin="normal"
                onChange={handleamountInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  required
                  fullWidth
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  onChange={handleDateInput}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                required
                fullWidth
                name="description"
                onChange={handleInput}
                rowsMax="4"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </form>

          <div className={classes.model__actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              onClick={handleEvent}
            >
              Save
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
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
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleInput: event => dispatch(handleUserInput(event)),
  handleEvent: event => dispatch(handleCreateEvent(event)),
  handleDateInput: date => dispatch(handleDateInput(date)),
  handleamountInput: amount => dispatch(handleAmountInput(amount))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventComponent);
