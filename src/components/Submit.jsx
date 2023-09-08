import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//Components
import Feeling from './Feeling';
import Understanding from './Understanding';
import Support from './Support';
import Comments from './Comments';

//Material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


function Submit () {

    const dispatch = useDispatch();
    const history = useHistory();
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

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
                <Comments />

        </List>
    

    )
}

export default Submit;