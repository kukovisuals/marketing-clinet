import produce from 'immer';
import React, { useCallback } from 'react';
import Upload from '../upload/upload';

function PdpSheet() {
  const [profile, setProfile] = React.useState<string[]>([]);

  const handleChildData = useCallback( (data: string[]) => {
      setProfile(data)
  },[setProfile, profile] ); 

  console.log('prodile in pdpSheet.tsx -> ', typeof profile)
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
  console.log(typeof  props.data, props.data)
  const sheetRows = props.data
  // for(let column = 2; column <  sheetRows.length; column++){

  //   if( sheetRows[column].length > 6 ){ 
  //     console.log('hey',sheetRows[column])
  //   }
  // }
  const [a, b, c, d, e, f, g, h, i, j, k, l] = props.data
  const index = props.index

  const flip = index % 2 === 0 ? 'light' : 'dark';

  if (index === 0) {
    return (
      <div className="eby-component-flex eby-header-style">
        <h3 className='eby-sheet-1'>{a}</h3>
        <h3 className='eby-sheet-lg' >{b}</h3>
        <h3 className='eby-sheet-sm' >{c}</h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
        <h3 className='eby-sheet-sm' ></h3>
      </div>
    )
  }
  return (
    <div className={`eby-component-flex eby-row-color-${flip}`}>
      <span className='eby-sheet-1' >{a}</span>
      <span className='eby-sheet-lg'>{b}</span>
      <span className='eby-sheet-sm'>{c}</span>
      <span className='eby-sheet-sm'>{d}</span>
      <span className='eby-sheet-sm'>{e}</span>
      <span className='eby-sheet-sm'>{f}</span>
      <span className='eby-sheet-sm'>{g}</span>
      <span className='eby-sheet-sm'>{h}</span>
      <span className='eby-sheet-sm'>{i}</span>
      <span className='eby-sheet-sm'>{j}</span>
      <span className='eby-sheet-sm'>{k}</span>
      <span className='eby-sheet-sm'>{l}</span>
    </div>
  )
}


export default PdpSheet
