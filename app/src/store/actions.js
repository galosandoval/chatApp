import axios from 'axios'

import { axiosWithAuth } from "../utils/axiosWithAuth"

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"

export const fetchMessages = () => {
  return (dispatch) => {
    axios.get("https://planner-be.herokuapp.com/messages")
    .then(res => {
      console.log(res)
      dispatch({ type: RECEIVE_MESSAGE, payload: res.data})
    })
  }
}