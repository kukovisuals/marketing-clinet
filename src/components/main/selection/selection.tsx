import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './selection.css'

function Selection() {

    const [value, setValue] = React.useState<Dayjs | null>(null);
    return (
        <div className="Selection">
            <h2>Selection</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select new month"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    )
}

export default Selection
