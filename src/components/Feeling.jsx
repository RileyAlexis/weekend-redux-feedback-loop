import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';


function Feeling ({submit}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const feeling = useSelector(store => store.feeling);
    const activeStep = useSelector(store => store.activeStep);
    const [value, setValue] = useState(feeling);
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
       if (value > 0) {
            dispatch({type: 'SET_FEELING', payload: value});
            dispatch({type: 'SET_ACTIVE_STEP', payload: 1});
            history.push('/stepper.understanding')
       }
       else if (value === 0) {
        setOpen(true);
       }
    }

    const setFeeling = () => {
        dispatch({type: 'SET_FEELING', payload: value});
        submit = false;
    }

    const handleClose = () => {
        setOpen(false);
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
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
        <Typography>How are you feeling today?</Typography>
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
            icon={<PetsSharpIcon />}
            emptyIcon={<PetsOutlinedIcon />} 
            />
            <br />
            <br />
            <br />
            {
                activeStep === 4 ? (<Button variant="outlined"  onClick={() => setFeeling()}>Set</Button>) :
                ( <Button variant="outlined" onClick={() => handleClick()}>Next</Button>)

            }
           
            </>

               
            )

    
}

export default Feeling;