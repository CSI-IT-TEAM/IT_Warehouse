import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemIcon from '@mui/material/ListItemIcon';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography, Stack } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

const SelectItem = ({ title, name, data, placeholder, cValue, handleEvent, isValidate, message , isImportant = false}) => {

    const handleChange = (event: SelectChangeEvent) => {
        handleEvent(name, event.target.value);
    };

    return (
        <>
            <Stack marginBottom={2} direction={{ xs: "column", sm: "column" }} alignItems={{ xs: "normal", sm: "normal" }} className="b-text-input">
                <Typography variant="h6" className="b-text-input__title flex italic">
                    {title} {isImportant && <span>(*)</span>}
                </Typography>
                <Stack sx={{ width: "100%" }}>
                    <FormControl fullWidth disabled={false}>
                        <Select
                            value={cValue}
                            onChange={handleChange}
                            displayEmpty
                            className="b-select"
                        >
                            <MenuItem value="" disabled className="b-select__item">
                                <Stack flexDirection="row" alignItems="flex-start" gap={1.5}>
                                    <ListItemIcon>
                                        <WarehouseOutlinedIcon />
                                    </ListItemIcon>
                                    <p style={{color: "#999"}}>{placeholder}</p>
                                </Stack>
                            </MenuItem>
                            {data?.map(item => {
                                return (
                                    <MenuItem key={item.CODE} value={item.CODE} className="b-select__item">{item.NAME}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {!isValidate && <Typography className='b-validate'><HighlightOffIcon sx={{width: '17px', height: '17px'}} />{message}</Typography> }
                </Stack>
            </Stack>
        </>
    );
}

export default SelectItem;