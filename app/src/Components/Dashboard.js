import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import axios from "axios";

import { NavBar } from "./NavBar";

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
    overflow: "scroll"
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

const initialTopic = [
  {
    topic_id: 0,
    title: "General"
  }
]

const initialMessages = [
  {
    id: 0,
    member_id: 0,
    username: "gmoney",
    description: "Hello World!"
  }
]

const initialMember = [
  {
    id: 0,
    username: "G",
    password: "password123",
    profile_picture: null
  }
]


export const Dashboard = () => {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");
  const [topic, setTopic] = useState(initialTopic);
  const [messages, setMessages] = useState(initialMessages);
  const [members, setMembers] = useState(initialMember);
  const [activeTopic, setActiveTopic] = useState(initialTopic[0].title)

  const postNewMessage = () => {
    axios.post("")
  }

  useEffect(() => {
    axios
      .get("https://planner-be.herokuapp.com/messages")
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://planner-be.herokuapp.com/topic")
      .then((res) => {
        setTopic(res.data.topic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <NavBar/>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List component="nav" aria-label="main mailbox folders">
              {topic.map((t) => (
                <ListItem onClick={(e) => setActiveTopic(e.target.innerText)} key={t.topic_id} button>
                  <ListItemText primary={t.title} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {messages.map((chat) => 
              chat.title === activeTopic ? (
              <div className={classes.flex} key={chat.id}>
                <Chip label={chat.username} className={classes.chip} />
                <Typography variant="body1" gutterBottom>
                  {chat.description}
                </Typography>
              </div>
            ): null )}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a message"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button color="primary">Send</Button>
        </div>
      </Paper>
    </div>
  );
};