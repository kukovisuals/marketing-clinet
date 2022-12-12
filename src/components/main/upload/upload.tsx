import { ChangeEvent } from "react";
import Papa, { parse } from 'papaparse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function Upload(props: any) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const csvData: any = event.target.result;
          const parsedData = Papa.parse(csvData);
          // -----------------------------------------------------------
          const comingData = parsedData.data
          const columns = comingData[0];
          let rows = []
          for (let i = 1; i < comingData.length; i++) {
            rows.push(comingData[i])

          }
          console.log('columns ->', columns)
          console.log('rows ->', rows)
          // -----------------------------------------------------------
          props.onData(parsedData.data)
        }
        // do something with the parsed data
      };
      reader.readAsText(file);
    }
  }
  return (
    <div className="Upload">
      <Button variant="contained" component="label">
        Upload
        <input hidden type="file" onChange={handleFileChange} />
      </Button>
    </div>
  )
}

export default Upload
