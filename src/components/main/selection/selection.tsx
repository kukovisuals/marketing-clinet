import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './selection.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Selection() {

    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [value2, setValue2] = React.useState<Dayjs | null>(null);
    return (
        <div className="Selection">
            <h2>Selection</h2>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <span> to </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic example"
                    value={value2}
                    onChange={(newValue) => {
                        setValue2(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Stack spacing={2} direction="row">
                <Button variant="text">Submit</Button>
                <Button variant="contained">Submit</Button>
                <Button variant="outlined">Submit</Button>
            </Stack>
        </div>
    )
}

export default Selection
