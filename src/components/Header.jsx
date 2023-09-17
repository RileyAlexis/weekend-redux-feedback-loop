import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { UseSelector, useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

function Header () {

    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
        dispatch({type: 'STEPPER_OFF'})
        history.push('/editResponses');
        };
    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const handleSignout = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    const activeStep = useSelector(store => store.activeStep);


    return (
        <>
        <h1>Reflection</h1>
        {
        activeStep === 0 ? (
            <>
            <Button variant="outlined" onClick={handleClose}>Edit Responses</Button>
            <Button variant="outlined" onClick={handleSignout}>Sign out</Button>
            </>
        )
        :
        ('')
        }
        </>
    )
}

export default Header;