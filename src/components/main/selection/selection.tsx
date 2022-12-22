import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { initObject } from "../../../features/month/month-slice";
import { styled } from '@mui/material/styles';

import './selection.css'

const CustomizeTextField = styled(TextField)`

  & .MuiTextField-root{
    border-radius: 30px;
  }
`;
const CustomButton = styled(Button)`
  height: 55px;
`;

function Selection() {

  // const classes = useStyles();

  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [load, setLoad] = React.useState<Dayjs | null>(null);
  const [response, setResponse] = React.useState(null);
  const [newDate, setNewDate] = React.useState({
    day: '',
    month: '',
    year: ''
  });

  React.useEffect(() => {
    console.log(value?.date())
    if (value && value.date() == 23) {

      console.log('2', value?.date())
      setNewDate({
        day: String(value.date()),
        month: String(value.month() + 1),
        year: String(value.year()),
      })
    } else {
      console.error('wrong date')
    }

  }, [value])
  React.useEffect(() => {
    console.log(load?.date())
    if (load && load.date() == 23) {

      console.log('2', load?.date())
      setNewDate({
        day: String(load.date()),
        month: String(load.month() + 1),
        year: String(load.year()),
      })
    } else {
      console.error('wrong date')
    }

  }, [load])

  if (response) {
    console.log(response)
  }

  const handleCreate = (event: React.MouseEvent) => {
    event.preventDefault();

    makePostRequest();

  }
  const handleLoad = (event: React.MouseEvent) => {
    event.preventDefault();
    makeGetRequest();
  }
  async function makePostRequest() {
    try {
      const formatDay = `${newDate.month}-${newDate.day}-${newDate.year}`;
      console.log('--2---->', formatDay)
      const res = await axios.post(`http://localhost:3001/api/monthViews/${formatDay}`);
      setResponse(res.data);

      const newMonth = res.data.profileData
      for (let i = 0; i < newMonth.length; i++) {

        dispatch(initObject({ id: i - 1, name: newMonth[i] }))
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function makeGetRequest() {
    try {
      const formatDay = `${newDate.month}-${newDate.day}-${newDate.year}`;
      console.log('------>', formatDay)
      const res = await axios.get(`http://localhost:3001/api/monthViews/${formatDay}`);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="Selection">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='eby-sm-flex eby-flx-spc-btw'>
          <div className='eby-sm-flex '>
            <div className='eby-inner-shdw'>
              <DatePicker
                label="Select new month"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomizeTextField  {...params} />}
              />
            </div>
            <div className='eby-inpt-spce'>
              <CustomButton variant="outlined" onClick={handleCreate}>
                CREATE
              </CustomButton>
            </div>
          </div>
          <div className='eby-sm-flex '>
            <div className='eby-inner-shdw'>
              <DatePicker
                label="Select new month"
                value={value}
                onChange={(newValue) => {
                  setLoad(newValue);
                }}
                renderInput={(params) => <CustomizeTextField {...params} />}
              />
            </div>
            <div className='eby-inpt-spce'>
              <CustomButton variant="outlined" onClick={handleLoad}>
                LOAD
              </CustomButton>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  )
}



export default Selection
