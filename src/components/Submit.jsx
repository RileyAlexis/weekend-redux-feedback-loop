import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';

//Components
import Feeling from './Feeling';
import Understanding from './Understanding';
import Support from './Support';
import Comments from './Comments';

//Material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';



function Submit () {

    const dispatch = useDispatch();
    const history = useHistory();
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);
    const userEmail = useSelector(store => store.userEmail);

    const handleSubmit = () => {
        const dataObj = {
            feelings: feeling,
            understanding: understanding,
            support: support,
            comments: comments,
            userEmail: userEmail
        }
        console.log(dataObj);
        console.log(userEmail);
        axios.post('/reflect/', dataObj)
        .then((response) => {
            dispatch({type: 'SET_ACTIVE_STEP', payload: 5});
            history.push('/complete');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
        <Typography>Review your selections and press 'Submit Reflection' when ready</Typography>
        <List>
            <ListItem>
                <Feeling submit={true}/>
            </ListItem>
            <Divider />
            <ListItem>
                <Understanding />
            </ListItem>
            <Divider />
            <ListItem>
                <Support />
            </ListItem>
            <Divider />
            <ListItem>
                <Comments />
            </ListItem>
            <Button variant="outlined" onClick={handleSubmit}>Submit Reflection</Button>

        </List>
        </>

    )
}

export default Submit;