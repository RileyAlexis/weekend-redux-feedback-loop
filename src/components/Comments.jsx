import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";

function Comments () {

const dispatch = useDispatch();
const history = useHistory();
const comment = useSelector(store => store.comments);
const [comments, setComments] = useState(comment);

const handleSubmit = () => {
    dispatch({type: 'SET_COMMENTS', payload: comments});
    dispatch({type: 'SET_ACTIVE_STEP', payload: 4});
    setComments('');
    history.push('/submit');
}

const skip = () => {
    history.push('/submit')
}


    return (
        <>
        <Typography>Any comments you want to leave?</Typography>
        <TextField 
        sx={{
           m: 1,
          }}
        fullWidth
        variant="filled"
        multiline
        minRows={6}
        onChange={(event) => setComments(event.target.value)}
        value={comments}
        />
        <Button variant="outlined" onClick={handleSubmit}>Submit Comments</Button>
        <Button variant="outlined" onClick={skip}>Skip</Button>
        </>
    )
}

export default Comments;