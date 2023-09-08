import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import StarsIcon from '@mui/icons-material/Stars';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { SupportAgent } from "@mui/icons-material";

function Support () {
    const history = useHistory();
    const activeStep = useSelector(store => store.activeStep);
    const support = useSelector(store => store.support);
    const dispatch = useDispatch();
    const [value, setValue] = useState(support);
    const [open, setOpen] = useState(false);

    
    const handleClick = () => {
        if (value > 0) {
             dispatch({type: 'SET_SUPPORT', payload: value});
             dispatch({type: 'SET_ACTIVE_STEP', payload: 3});
             history.push('/comments')
        }
        else if (value === 0) {
         setOpen(true);
        }
     }

     const setSupport = () => {
        dispatch({type: 'SET_SUPPORT', payload: value});
     }
 
     const handleClose = () => {
         setOpen(false);
     }
 
     const StyledRating = styled(Rating)({
         '& .MuiRating-iconFilled': {
             color: '#6517E2',
         },
         '& .MuiRating-iconHover': {
             color: '##6517E2',
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
         <Typography>How well are you being supported?</Typography>
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
             icon={<StarsIcon />}
             emptyIcon={<StarsOutlinedIcon />} 
             />
             <br />
             <br />
             <br />
             {
                activeStep === 4 ? 
                     (
                         <Button variant="outlined" onClick={() => setSupport()}>Set</Button>
                     )
                     :
                     (
                         <Button variant="outlined" onClick={() => handleClick()}>Next</Button>
                     )

            }
         </>
     )
 }

export default Support;