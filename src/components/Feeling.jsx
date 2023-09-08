import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { Button } from "@mui/material";

function Feeling () {
    
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
        <Typography>How are you feeling today?</Typography>
        <StyledRating
            required
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
            <Button variant="outlined" onClick={() => handleClick()}>Next</Button>
        </>
    )
}

export default Feeling;