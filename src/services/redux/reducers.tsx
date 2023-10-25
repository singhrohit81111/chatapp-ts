const senderReducer = (state = null, action:any) => {
  switch (action.type) {
    case "SET_SENDER_ID":
      return action.senderId;
      case "SET_CURRENT_USER_FCM_TOKEN":
      return action.curentUserFcmToken;
    default:
      return state;
  }
};

export default senderReducer;