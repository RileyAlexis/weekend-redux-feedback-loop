import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//Material UI
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Container } from '@mui/material';

//Components
import Header from '../Header';
import Feeling from '../Feeling';
import Understanding from '../Understanding';
import Support from '../Support';
import Comments from '../Comments';
import Submit from '../Submit';
import Complete from '../Complete';

import './App.css';

function App() {

  const dispatch = useDispatch();
  const stepperData = ['How do you Feel?', 
                'How well are you understanding the content?', 
                'How well are you being supported?', 
                'Comments',
                'Submit'];



  const steps = useSelector(store => store.steps);
  const activeStep = useSelector(store => store.activeStep);

  const setSteps = () => {
    dispatch({type: 'SET_STEPS', payload: stepperData})
    dispatch({type: 'SET_ACTIVE_STEP', payload: 0})
  }



  useEffect(() => {
    setSteps();
  }, []);

  return (
    <div className="container">
    <div className="header">
      <Header />
      </div>
      <div className="stepper">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
      <div className="content">
      <Router>
        <Route exact path="/" component={Feeling} />
        <Route exact path="/understanding" component={Understanding} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/comments" component={Comments} />
        <Route exact path="/submit" component={Submit} />
        <Route exact path="/complete" component={Complete} />

      </Router>
      </div>
    </div>








    // <div className='App'>
    //   <header className='App-header'>
    //     <h1 className='App-title'>Feedback!</h1>
    //     <h4>Don't forget it!</h4>
    //   </header>
    // </div>
  );
}

export default App;
