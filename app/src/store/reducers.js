const initialState = {
  general: [
    { from: "galo", msg: "hello" },
    { from: "lisa", msg: "yo" },
    { from: "corbin", msg: "sup" },
  ],
  topic2: [
    { from: "patrick", msg: "hello" },
    { from: "sarah", msg: "yo" },
    { from: "mannie", msg: "sup" },
  ],
};

export const reducer = (state = initialState, action) => {
  const { topic, from, msg } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };
    default:
      return state;
  }
};
