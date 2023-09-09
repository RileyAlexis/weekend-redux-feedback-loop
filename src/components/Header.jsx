import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { UseSelector, useSelector, useDispatch } from "react-redux";


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
    const activeStep = useSelector(store => store.activeStep);


    return (
        <>
        <h1>Reflection</h1>
        {
        activeStep === 0 ? (
            <>
            <Button
                id="menuButton"
                aria-controls={open ? 'adminMenu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>Admin
            </Button>
            <Menu 
                id="adminMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
            <MenuItem onClick={handleClose}>Edit Responses</MenuItem>
            </Menu>
            </>
        )
        :
        ('')
        }
        </>
    )
}

export default Header;