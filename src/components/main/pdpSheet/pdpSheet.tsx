import React, { useCallback } from 'react';
import Upload from '../upload/upload';

function PdpSheet() {
  const [profile, setProfile] = React.useState<string[]>([]);

  const handleChildData = useCallback((data: string[]) => {
    setProfile(data)
  }, [setProfile, profile]);

  console.log('prodile in pdpSheet.tsx -> ', profile)
  return (
    <div className="Profile">
      <Upload onData={handleChildData} />
      <div className='sheet-block'>
        {typeof profile != 'object' ? (
          <p> something when twon</p>
        ) : (
          profile.map((d: string, i: number) =>
            <ImportedData key={`eby-imort-${i}`} data={d} index={i} />
          )

        )}

      </div>
    </div>
  )
}

interface ImportType {
  data: string;
  index: number;
}

function ImportedData(props: ImportType) {

  console.log(props.data.length)
  const [a, b, c, d, e, f, g, h, i, j, k, l] = props.data
  const index = props.index

  const flip = index % 2 === 0 ? 'light' : 'dark';

  if (index === 0) {
    return (
      <div className="eby-component-flex eby-header-style">
        {
          props.data.map((d: any, j:number) => <HeaderSheet sheetData={d} key={index+'-'+j} />)
        }
      </div>
    )
  } else {
    return (
      <div className={`eby-component-flex eby-row-color-${flip}`}>
        {
          props.data.map((d: any, j:number) => <ListSheet num={j} sheetData={d} key={index+'-'+j} />)
        }
      </div>
    )
  }
}

type SheetTypes = {
  sheetData: string,
  num: number
}
function HeaderSheet(props: SheetTypes) {

  return (
    <h3 className='eby-sheet-sm'>{props.sheetData}</h3>
  )
}

function ListSheet(props: SheetTypes) {

  return (
    <span className='eby-sheet-sm'>{props.sheetData}</span>
  )
}

export default PdpSheet
