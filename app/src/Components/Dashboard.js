import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
  chip: {},
}));

export const Dashboard = () => {
  const classes = useStyles();
  const [textValue, setTextValue] = useState('')
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography variant="h5" component="h5">
          Topic Placeholder
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List component="nav" aria-label="main mailbox folders">
              {["topic"].map((topic) => (
                <ListItem key={topic} button>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {[{ from: "user", msg: "hello" }].map((chat, index) => (
              <div className={classes.flex} key={index}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a message" 
            className={classes.chatBox}
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
          />
          <Button color="primary">Send</Button>
        </div>
      </Paper>
    </div>
  );
};
