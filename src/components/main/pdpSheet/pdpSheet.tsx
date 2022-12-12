import React from 'react';
import Upload from '../upload/upload';
import {
  DataGridPro,
  GridRowModel,
  GridRowOrderChangeParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';

function updateRowPosition(
  initialIndex: number,
  newIndex: number,
  rows: Array<GridRowModel>,
): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rowsClone = [...rows];
      const row = rowsClone.splice(initialIndex, 1)[0];
      rowsClone.splice(newIndex, 0, row);
      resolve(rowsClone);
    }, 10); // simulate network latency
  });
}

function PdpSheet() {
    const [profile, setProfile] = React.useState<string[]>([]);
   
    // grab CSV data
    const handleChildData = (data:string[]) => {
        console.log(data)
        setProfile(data)
    }




    const { data, loading: initialLoadingState } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 20,
      maxColumns: 20,
    });
  
    const [rows, setRows] = React.useState(data.rows);
    const [loading, setLoading] = React.useState(initialLoadingState);
  
    React.useEffect(() => {
      setRows(data.rows);
    }, [data]);
  
    React.useEffect(() => {
      setLoading(initialLoadingState);
    }, [initialLoadingState]);
  
    const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
      setLoading(true);
      const newRows = await updateRowPosition(
        params.oldIndex,
        params.targetIndex,
        rows,
      );
  
      setRows(newRows);
      setLoading(false);
    };

    console.log('data', data)
    return (
      <div className="Profile">
        <h2>Upload</h2>
        <Upload onData={handleChildData} />
        <div>
          {profile && profile.map((d:string, i:number) =>
            <ImportedData data={d} index={i}/>  
          )}
        </div>


        <div style={{ height: 600, width: '100%' }}>
      <DataGridPro
        loading={loading}
        rows={rows}
        columns={data.columns}
        rowReordering
        onRowOrderChange={handleRowOrderChange}
      />
    </div>
      </div>
    )
}

interface ImportType{
  data:string;
  index:number;
}

function ImportedData(props:ImportType){
  const [a, b, c, d, e, f, g, h, i, j, k, l] = props.data
  const index = props.index

  const flip = index % 2 === 0 ? 'light' : 'dark';

  if(index === 0){
    return(
      <div className="eby-component-flex eby-header-style">
        <h3 className='eby-sheet-1'  key={'id-' + c}>{a}</h3>
        <h3 className='eby-sheet-lg' key={a + b}>{b}</h3>
        <h3 className='eby-sheet-sm' key={b + c}>{c}</h3>
        <h3 className='eby-sheet-sm' key={e}>{e}</h3>
        <h3 className='eby-sheet-sm' key={f}>{f}</h3>
        <h3 className='eby-sheet-sm' key={g}>{g}</h3>
        <h3 className='eby-sheet-sm' key={h}>{h}</h3>
        <h3 className='eby-sheet-sm' key={i}>{i}</h3>
        <h3 className='eby-sheet-sm' key={j}>{j}</h3>
        <h3 className='eby-sheet-sm' key={k}>{k}</h3>
        <h3 className='eby-sheet-sm' key={l}>{l}</h3>
      </div>
    )
  }
  return(
    <div className={`eby-component-flex eby-row-color-${flip}`}>
      <span className='eby-sheet-1' key={'id-' + c}>{a}</span>
      <span className='eby-sheet-lg' key={a + '-' + b}>{b}</span>
      <span className='eby-sheet-sm' key={a + '-' + c}>{c}</span>
      <span className='eby-sheet-sm' key={e}>{e}</span>
      <span className='eby-sheet-sm' key={f}>{f}</span>
      <span className='eby-sheet-sm' key={g}>{g}</span>
      <span className='eby-sheet-sm' key={h}>{h}</span>
      <span className='eby-sheet-sm' key={i}>{i}</span>
      <span className='eby-sheet-sm' key={j}>{j}</span>
      <span className='eby-sheet-sm' key={k}>{k}</span>
      <span className='eby-sheet-sm' key={l}>{l}</span>
    </div>
  )
}

  
export default PdpSheet
  