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
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';


function Submit () {

    const dispatch = useDispatch();
    const history = useHistory();
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

    const handleSubmit = () => {
        const dataObj = {
            feelings: feeling,
            understanding: understanding,
            support: support,
            comments: comments
        }
        console.log(dataObj);
        axios.post('/reflect/', dataObj)
        .then((response) => {
            history.push('/complete');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <List>
            <ListItem>
                <Feeling submit={true}/>
            </ListItem>
            <Divider />
            <ListItem>
                <Understanding />
            </ListItem>
            <ListItem>
                <Support />
            </ListItem>
            <ListItem>
                <Comments />
            </ListItem>
            <Button variant="outlined" onClick={handleSubmit}>Submit Reflection</Button>

        </List>
    

    )
}

export default Submit;