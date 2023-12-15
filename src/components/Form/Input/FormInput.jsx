import { useState } from 'react';
import { TextField, Stack, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./FormInput.scss";

const FormInput = ({ title, placeholder, value, disable , inputProp, name="", handleEvent, isImportant=false, isValidate=true, message="", isDefault=false, multiline=1, bg="default" }) => {        
    
    const [showPass, setShowPass] = useState(false);

    const handleClick = () => {
        setShowPass(showPass => !showPass);
    }

    return (
        <>
            <Stack
                marginBottom={2} 
                direction={{xs: isDefault ? "column" : "row", sm: isDefault ? "row" : "column"}} 
                alignItems={{xs: isDefault ? "flex-start" : "center", sm: isDefault ? "center" : "normal"}} 
                className={bg === "default" ? 'b-text-input' : 'b-text-input b-text-input--white'}>
                <Typography variant="h6" className={`b-text-input__title b-italic`} style={{marginBottom: isDefault ? 5 : 0}}>
                    {title} {isImportant && <span>(*)</span>}
                </Typography>
                <Stack sx={{width:"100%", background: "#f8f6f7"}}>
                    <TextField
                        name={name}
                        inputProps={inputProp}
                        type={showPass ? 'text' : 'password'}
                        className="b-text-input__desc"
                        disabled={disable}
                        placeholder={placeholder}
                        color="info"
                        fullWidth
                        value={value}
                        onChange={handleEvent}
                        rows={multiline}
                        multiline={multiline !== 1 ? true : false}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ paddingLeft: 1.5, }} onClick={handleClick} >
                                    {showPass ? <VisibilityOffIcon />: <VisibilityIcon /> }
                                </InputAdornment>
                            ),
                        }}
                    />
                    {!isValidate && <Typography className='b-validate'><HighlightOffIcon sx={{width: '17px', height: '17px'}} />{message}</Typography> }
                </Stack>
            </Stack>
        </>
    );
}

export default FormInput;