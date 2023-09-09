import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


//Material UI
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';

//Components
import Header from '../Header';
import Feeling from '../Feeling';
import Understanding from '../Understanding';
import Support from '../Support';
import Comments from '../Comments';
import Submit from '../Submit';
import Complete from '../Complete';
import Admin from '../Admin';

import './App.css';

function App() {

  const dispatch = useDispatch();
  const stepperData = ['How do you Feel?', 
                'How well are you understanding the content?', 
                'How well are you being supported?', 
                'Comments',
                'Submit'];

  const steps = useSelector(store => store.steps);
  //Redux stores the active step in the global state
  const activeStep = useSelector(store => store.activeStep);

  const setSteps = () => {
    //Inititalizes the stepper nav aid and sets it to step 0
    dispatch({type: 'SET_STEPS', payload: stepperData})
    dispatch({type: 'SET_ACTIVE_STEP', payload: 0})
  }
  
  useEffect(() => {
    setSteps();
  }, []);

  return (
    <Router>
      <div className="container">

        <div className="header">
          <Header />
        </div>
        {/* TODO : will require user authenication before displaying this component */}
        <Route exact path="/editResponses" component={Admin} />
        <Route path="/">
          {/* Only shows stepper nav aid if activeStep is not set to -1 */}
          {activeStep >= 0 ? (
            <>
              <div className="stepper">
                <Stepper activeStep={activeStep}>
                  {steps.map((label, i) => (
                    <Step key={i}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </>
          )
            :
            (
              <></>
            )
          }

        </Route>
        <div className="content">
          <Route exact path="/" component={Feeling} />
          <Route path="/understanding" component={Understanding} />
          <Route path="/support" component={Support} />
          <Route path="/comments" component={Comments} />
          <Route path="/submit" component={Submit} />
          <Route path="/complete" component={Complete} />
        </div>
      </div>
    </Router>
  );
}

export default App;
