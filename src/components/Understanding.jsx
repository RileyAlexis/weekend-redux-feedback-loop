import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

function Understanding () {

    const history = useHistory();
    const dispatch = useDispatch();
    const activeStep = useSelector(store => store.activeStep)
    const understanding = useSelector(store => store.understanding);
    const [value, setValue] = useState(understanding);
    const [open, setOpen] = useState(false);

    
    const handleClick = () => {
        if (value > 0) {
             dispatch({type: 'SET_UNDERSTANDING', payload: value});
             dispatch({type: 'SET_ACTIVE_STEP', payload: 2});
             history.push('/support')
        }
        else if (value === 0) {
         setOpen(true);
        } 
     }
 
     const setUnderstanding = () => {
        dispatch({type: 'SET_UNDERSTANDING', payload: value});
     }

     const handleClose = () => {
         setOpen(false);
     }
 
     const StyledRating = styled(Rating)({
         '& .MuiRating-iconFilled': {
             color: '#4ad31f',
         },
         '& .MuiRating-iconHover': {
             color: '#4ad31f',
         },
     });
 
     return (
         <>
             <Snackbar 
                 open={open}
                 autoHideDuration={3000}
                 onClose={handleClose}
                 message='Please select a rating before proceeding'
                 anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                 
                 
                 >
             </Snackbar>
         <Typography>How well are you understanding the content?</Typography>
         <br />
         <StyledRating
             required
             value={value}
             onChange={(event, newValue) => setValue(newValue)}
             name="customized-color"
             defaultValue={0.5}
             getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
             precision={0.5}
             max={10}
             icon={<SchoolIcon />}
             emptyIcon={<SchoolOutlinedIcon />} 
             />
             <br />
             <br />
             <br />
             {
                activeStep === 4 ? 
                     (
                         <Button variant="outlined" onClick={() => setUnderstanding()}>Set</Button>
                     )
                     :
                     (
                         <Button variant="outlined" onClick={() => handleClick()}>Next</Button>
                     )

            }
         </>
     )
 }

export default Understanding;