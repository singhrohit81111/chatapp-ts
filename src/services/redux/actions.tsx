export const setSenderId = (senderId:any) => {
    return {
      type: "SET_SENDER_ID",
      senderId,
    };
  }


  export const setCurrentUserFcmToken = (fcmToken:any) => {
    return {
      type: "SET_CURRENT_USER_FCM_TOKEN",
      fcmToken,
    };
  }