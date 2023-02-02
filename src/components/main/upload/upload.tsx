import { ChangeEvent } from "react";
import Papa, { parse } from 'papaparse';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { initObject, addSelectedPdp } from "../../../features/sheet/sheet-slice";
import Profile from "../../profile/profile";
import { TodoType } from '../../../utilities/profileTypes';


function Upload(props: any) {
  // grab the reducer from sheet-slice 
  const dispatch = useAppDispatch();
  const pdpSkuData = useAppSelector((state) => state.profile.mainData)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const csvData: any = event.target.result;
          const parsedData = Papa.parse(csvData);
          // -----------------------------------------------------------
          const comingData: any = parsedData.data
          const columns = comingData[0];
          let rows = []

          for (let i = 1; i < comingData.length; i++) {

            rows.push(comingData[i])
            const rowA = comingData[i][1].split('-')[1]

            let skuArr: TodoType[] = []

            dispatch(initObject({ id: i - 1, name: rowA, pdpArr: [] }))
          }
          
          setTimeout(() => {
            for (let i = 1; i < comingData.length; i++) {

              let skuArr: TodoType[] = []
              for (let column = 2; column < comingData[i].length; column++) {
  
                if (comingData[i][column].length > 6) {
  
                  for (let k = 0; k < pdpSkuData.length; k++) {
  
                    if (k == pdpSkuData.length - 1) {
                      console.warn("coudln't find product SKU for -> " + comingData[i][column])
                    }
                    if (comingData[i][column] == pdpSkuData[k].sku) {
                      /* 
                        **********************************************
                        **         Found sku in pdp payload         **
                        **********************************************
                      */
                      skuArr.push({
                        id: String(pdpSkuData[k].id),
                        name: `${pdpSkuData[k].sku}::${pdpSkuData[k].sizeId}`
                      })
                      console.log('matching -> ', comingData[i][column], pdpSkuData[k])
                      k = pdpSkuData.length
                    }
  
  
                  }
  
                }
              }
              dispatch(addSelectedPdp({
                index: i,
                description: skuArr
              }))
            }
          }, 2000)
          
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
