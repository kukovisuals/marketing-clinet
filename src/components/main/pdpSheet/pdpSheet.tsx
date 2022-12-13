import React from 'react';
import Upload from '../upload/upload';

function PdpSheet() {
  const [profile, setProfile] = React.useState<string[]>([]);

  // grab CSV data
  const handleChildData = (data: string[]) => {
    // console.log(data)
    setProfile(data)
  }

  return (
    <div className="Profile">
      <h2>Upload</h2>
      <Upload onData={handleChildData} />
      <div>
        {profile && profile.map((d: string, i: number) =>
          <ImportedData data={d} index={i} />
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
  const [a, b, c, d, e, f, g, h, i, j, k, l] = props.data
  const index = props.index

  const flip = index % 2 === 0 ? 'light' : 'dark';

  if (index === 0) {
    return (
      <div className="eby-component-flex eby-header-style">
        <h3 className='eby-sheet-1' key={'id-' + c}>{a}</h3>
        <h3 className='eby-sheet-lg' key={a + b}>{b}</h3>
        <h3 className='eby-sheet-sm' key={b + c}>{c}</h3>
        <h3 className='eby-sheet-sm' key={d}>{d}</h3>
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
  return (
    <div className={`eby-component-flex eby-row-color-${flip}`}>
      <span className='eby-sheet-1' key={'id-' + c}>{a}</span>
      <span className='eby-sheet-lg' key={a + '-' + b}>{b}</span>
      <span className='eby-sheet-sm' key={a + '-' + c}>{c}</span>
      <span className='eby-sheet-sm' key={d}>{d}</span>
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
