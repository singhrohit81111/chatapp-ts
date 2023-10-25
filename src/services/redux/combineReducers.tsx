// reducers/index.js
import { combineReducers } from 'redux';
import senderReducer from './reducers';

const rootReducer = combineReducers({
  senderId: senderReducer,
  
  // Other reducers can be added here if needed
});

export default rootReducer;
