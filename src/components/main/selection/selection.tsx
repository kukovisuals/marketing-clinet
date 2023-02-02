import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { initObject, resetSheet } from "../../../features/sheet/sheet-slice";
import { isUpload } from "../../../features/profile/profile-slice";
import { styled } from '@mui/material/styles';
import ListProfiles from '../../profile/ListProfiles';
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
  const sheet = useAppSelector((state) => state.sheet);
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<Date | any>(new Date());
  const [response, setResponse] = React.useState(null);
  const [newDate, setNewDate] = React.useState({
    month: '',
    year: ''
  });
  const [isLoad, setIsLoad] = React.useState(false);

  if (response) {
    console.log(response)
  }
  console.log('date ', value)
  const handleCreate = (event: React.MouseEvent) => {
    let monthValue = ''
    let yearValue = ''
    if(typeof value?.$M == 'number'){

      monthValue = String(value.$M + 1)
      yearValue = String(value.$y)
      setIsLoad(true)

    } else {
      monthValue = String(value.getMonth() + 1)
      yearValue = String(value.getFullYear())
      setIsLoad(true)
    }

    setNewDate({
      month: monthValue,
      year: yearValue,
    })
    console.log(newDate)
    const mm = String(newDate.month).padStart(2, "0");
    makePostRequest([newDate.year, mm]);
    dispatch(isUpload(isLoad))
    alert('🚀 You have created and empty field of all profiles, ready to get filled 👍')

  }

  async function makePostRequest(formatDay: string[]) {
    dispatch(resetSheet())
    try {
      const [year, month] = formatDay;
      const mvid = `${year}-${month}`
      console.log('Date ------>', mvid)
      const res = await axios.get(`http://localhost:3001/api/monthViews/${mvid}`);
      setResponse(res.data);
      const newMonth = res.data[0].profiles
      console.log('selection.tsx meakepost request ------>', newMonth)
      
      
      for (let i = 0; i < newMonth.length; i++) {

        for(const sizeK of Object.keys(newMonth[i].sizes[0]) ){
          /*
            ------------------------------------------------------------
            -  Here you can change the payload id::sku::sizeId         -   
            ------------------------------------------------------------
          */
          const pdpEmptyArr = []
          if(!sizeK.includes('_id')){
            // console.log('sheet new month=> ', newMonth[i].sizes[0][sizeK])
            const newValues = newMonth[i].sizes[0][sizeK]      
            
            if (newValues.length > 0) {

              for(const sizeElement of newValues){
                
                const newPdpObj = { id: sizeElement.split('--')[0], name: sizeElement.split('--')[1] } 
                 pdpEmptyArr.push(newPdpObj)
              }
            } 

            dispatch(initObject({ id: i, name: newMonth[i].name + ' in ' + sizeK, pdpArr: pdpEmptyArr }))
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log('sheet selection.tsx => ', sheet)
  return (
    <div className="Selection">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='eby-sm-flex eby-flx-spc-btw'>
          <div className='eby-sm-flex '>
            <div className='eby-inner-shdw'>
              <DatePicker
                label="Select new date"
                value={value}
                openTo="month"
                views={["year", "month"]}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <CustomizeTextField  {...params} />}
              />
            </div>
            <div className='eby-inpt-spce'>
              <CustomButton variant="outlined" onClick={handleCreate}>
                SUBMIT
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
