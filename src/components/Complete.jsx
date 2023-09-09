import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

import { Button, Typography } from '@mui/material';

function Complete() {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({type: 'RESET'});
        dispatch({type: 'SET_ACTIVE_STEP', payload: 0});
        history.push('/');
    }

    return (
        <>
        <Typography>Submission is complete and has been logged. To submit another reflection press the below button</Typography>
        <br />
        <br />
        <Button variant="outlined" onClick={handleClick}>Reset</Button>
        </>
    )
}

export default Complete;