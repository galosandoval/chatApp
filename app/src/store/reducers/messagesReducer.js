const initialState = {
  description: "",
  member_id: 1
};

export const messagesReducer = (state = initialState, action) => {
  const { description, member_id } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        description,
        member_id
      };
    default:
      return state;
  }
};
