import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { CookiesProvider } from 'react-cookie';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const feeling = (state = 0, action) => {
    if (action.type === 'SET_FEELING') {
        return action.payload;
    } else if (action.type === 'RESET') {
        return state = 0;
    }
    return state;
}

const understanding = (state = 0, action) => {
    if (action.type === 'SET_UNDERSTANDING') {
        return action.payload;
    } else if (action.type === 'RESET') {
        return state = 0;
    }
    return state;
}

const support = (state = 0, action) => {
    if (action.type === 'SET_SUPPORT') {
        return action.payload;
    } else if (action.type === 'RESET') {
        return state = 0;
    }
    return state;
}

const comments = (state = '', action) => {
    if (action.type === 'SET_COMMENTS') {
        return action.payload;
    } else if (action.type === 'RESET') {
        return state = '';
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
    } else if (action.type === 'STEPPER_OFF') {
        return state = -1;
    } else if (action.type === 'STEPPER_ON') {
        return state = 0;
    }
    return state;
}

const userEmail = (state = '', action) => {
    if (action.type === 'SET_USER_EMAIL') {
        return action.payload;
    }
    return state;
}

const authorizedUser = (state = null, action) => {
   if (action.type === 'AUTHORIZE') {
    return action.payload;
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
      activeStep,
      userEmail,
      authorizedUser
    }),
    applyMiddleware(logger)
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <CookiesProvider>
        <App />
        </CookiesProvider>
        </Provider>
    </React.StrictMode>
);
