import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const feeling = (state = 0, action) => {
    if (action.type === 'SET_FEELING') {
        return action.payload;
    }
    return state;
}

const understanding = (state = 0, action) => {
    if (action.type === 'SET_UNDERSTANDING') {
        return action.payload;
    }
    return state;
}

const support = (state = 0, action) => {
    if (action.type === 'SET_SUPPORT') {
        return action.payload;
    }
    return state;
}

const comments = (state = '', action) => {
    if (action.type === 'SET_COMMENTS') {
        return action.payload;
    }
    return state;
}

const steps = (state = [], action) => {
    if (action.type === 'SET_STEPS') {
        return action.payload;
    }
    return state;
}

const activeStep = (state = 0, action) => {
    if (action.type === 'SET_ACTIVE_STEP' && state > 0 < 4) {
        return action.payload;
    } else if (action.type === 'SET_ACTIVE_STEP' && state === 4) {
        return state = 4;
    }
    return state;
}

const storeInstance = createStore(
    // reducers,{
    combineReducers({
      feeling,
      understanding,
      support, 
      steps,
      comments,
      activeStep
    }),
    applyMiddleware(logger)
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>
);
