import React, { useEffect, useState, useCallback } from "react";
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
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    overflow: "scroll",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "scroll",
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
    title: "General",
  },
];

const initialMessages = [
  {
    id: 0,
    member_id: 0,
    username: "gmoney",
    description: "Hello World!",
  },
];

export const Dashboard = () => {
  const classes = useStyles();
  const [textValue, setTextValue] = useState("");
  const [topic, setTopic] = useState(initialTopic);
  const [messages, setMessages] = useState(initialMessages);
  const [activeTopic, setActiveTopic] = useState(initialTopic[0].title);
  const [disabled, setDisabled] = useState(true);

  const updateScroll = () => {
    const element = document.getElementById("scroll");
    element.scrollTop = element.scrollHeight;
  };

  const getTopicId = (topicTitle) => {
    const filteredTopic = topic.filter((t) => t.title === topicTitle);
    return filteredTopic[0].topic_id;
  };

  const getMessages = useCallback(() => {
    axios
      .get("https://planner-be.herokuapp.com/messages")
      .then((res) => {
        setMessages(res.data.messages);
        updateScroll();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postNewMessage = () => {
    const postData = {
      description: textValue,
      member_id: Number(localStorage.getItem("member_id")),
      topic_id: getTopicId(activeTopic),
    };

    axiosWithAuth()
      .post("https://planner-be.herokuapp.com/messages", postData)
      .then((res) => {
        setTextValue("");
        getMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewMessage();
  };

  useEffect(() => {
    if (textValue.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [textValue]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
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
      <NavBar />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List component="nav" aria-label="main mailbox folders">
              {topic.map((t) => (
                <ListItem
                  onClick={(e) => setActiveTopic(e.target.innerText)}
                  key={t.topic_id}
                  button
                >
                  <ListItemText primary={t.title} />
                </ListItem>
              ))}
            </List>
          </div>
          <div id="scroll" className={classes.chatWindow}>
            {messages.map((chat) =>
              chat.title === activeTopic ? (
                <div className={classes.flex} key={chat.id}>
                  <Chip label={chat.username} className={classes.chip} />
                  <Typography variant="body1" gutterBottom>
                    {chat.description}
                  </Typography>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className={classes.flex}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Send a message"
              className={classes.chatBox}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <Button type="submit" disabled={disabled} color="primary">
              Send
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
};
