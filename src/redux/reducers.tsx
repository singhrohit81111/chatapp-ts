const senderReducer = (state = null, action:any) => {
  switch (action.type) {
    case "SET_SENDER_ID":
      return action.senderId;
    default:
      return state;
  }
};

export default senderReducer;