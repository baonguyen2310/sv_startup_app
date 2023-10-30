// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import loginReducer from '../reducers/loginReducer';
// import thunk from 'redux-thunk';

// const rootReducer = combineReducers({
//   login: loginReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    userReducer: userReducer
  },
});

export default store;
