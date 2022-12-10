import React, {ChangeEvent} from "react";
import Papa, { parse } from 'papaparse';

function Upload(props:any) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target && event.target.files){

            const file = event.target.files[0];
            const reader = new FileReader();
        
            reader.onload = (event) => {
                if(event.target && event.target.result){
                    const csvData = event.target.result;
                    const parsedData = Papa.parse(csvData);
                    // console.log(parsedData)
                    props.onData(parsedData.data)
                }
              // do something with the parsed data
            };
        
            reader.readAsText(file);
        }
      }
    return (
      <div className="Upload">
        <input type="file" onChange={handleFileChange} />
    
      </div>
    )
  }
  
  export default Upload
  