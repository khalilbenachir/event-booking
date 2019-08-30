import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflowY: "auto",
    maxHeight: "40vh",
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(0)
  }
}));

const EventList = ({ events, email, emailSaved }) => {
  const classes = useStyles();
  const eventsList = events.map((event, index) => {
    return (
      <React.Fragment key={event._id}>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={event.title.toUpperCase()}
            secondary={`${event.price}$`}
          />
          <div className={classes.details}>
            {email === event.creator.email ? (
              <React.Fragment>You are the owner</React.Fragment>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                more details
              </Button>
            )}
          </div>
        </ListItem>
        {events.length !== index + 1 ? <Divider /> : ""}
      </React.Fragment>
    );
  });
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {eventsList}
      </List>
    </div>
  );
};

export default EventList;
