import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

//Material UI
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel'

function FeedbackStepper() {

    const steps = useSelector(store => store.steps);
    const activeStep = useSelector(store => store.activeStep);
    const dispatch = useDispatch();

    const stepperData = ['How do you Feel?', 
    'How well are you understanding the content?', 
    'How well are you being supported?', 
    'Comments',
    'Submit'];

    const setSteps = () => {
        //Inititalizes the stepper nav aid and sets it to step 0
        dispatch({type: 'SET_STEPS', payload: stepperData})
        dispatch({type: 'SET_ACTIVE_STEP', payload: 0})
      }

      useEffect(() => {
        setSteps();
      }, []);

    return (
        <div className="stepper">
        <Stepper activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </div>
    )
}

export default FeedbackStepper;