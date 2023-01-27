import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../app/hooks';
import { initObject, restartMonth } from "../../../features/month/month-slice";
import { isUpload } from "../../../features/profile/profile-slice";
import { styled } from '@mui/material/styles';

import Send from '../../send/Send';

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

  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<Date | null>(new Date());
  const [response, setResponse] = React.useState(null);
  const [newDate, setNewDate] = React.useState({
    month: '',
    year: ''
  });
  const [isLoad, setIsLoad] = React.useState(false);

  if (response) {
    console.log(response)
  }

  console.log(value?.getFullYear())
  const handleCreate = (event: React.MouseEvent) => {

    if (value) {
      setNewDate({
        month: String(value.getMonth() + 1),
        year: String(value.getFullYear()),
      })
      setIsLoad(true)
    }
    makePostRequest();
    dispatch(isUpload(isLoad))
    alert('🚀 You have created and empty field of all profiles, ready to get filled 👍')

  }

  async function makePostRequest() {
    try {
      const [year, month] = formatDay();
      const mvid = `${year}-${month}`
      console.log('Date ------>', mvid)
      const res = await axios.get(`http://localhost:3001/api/monthViews/${mvid}`);
      setResponse(res.data);
      const newMonth = res.data[0].profiles
      console.log('selection.tsx meakepost request ------>', newMonth)

      dispatch(restartMonth())
      for (let i = 0; i < newMonth.length; i++) {

        dispatch(initObject({ id: i, name: newMonth[i] }))
      }
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
                label="Select new date"
                value={value}
                views={["year", "month"]}
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
          <Send />
        </div>
      </LocalizationProvider>
    </div>
  )
}


function formatDay() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  console.log(mm)
  return [yyyy, mm];
}

export default Selection
