import { ChangeEvent } from "react";
import Papa, { parse } from 'papaparse';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { initObject } from "../../../features/sheet/sheet-slice";

function Upload(props: any) {
  // grab the reducer from sheet-slice 
  const dispatch = useAppDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const csvData: any = event.target.result;
          const parsedData = Papa.parse(csvData);
          // -----------------------------------------------------------
          const comingData:any = parsedData.data
          const columns = comingData[0];
          let rows = []
          for (let i = 1; i < comingData.length; i++) {
            rows.push(comingData[i])
            const rowA = comingData[i][1]
              .split('-')[1]
            dispatch(initObject({id:i - 1, name:rowA}))
          }
          // -----------------------------------------------------------
          props.onData(parsedData.data)
        }
      };
      reader.readAsText(file);
    }
  }
  return (
    <div className="Upload">
      <Button variant="outlined" component="label">
        Upload
        <input hidden type="file" onChange={handleFileChange} />
      </Button>
    </div>
  )
}

export default Upload
