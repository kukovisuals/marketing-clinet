import React from 'React';
import Upload from '../upload/upload';

function Profile() {
    const [profile, setProfile] = React.useState<string[]>([]);
   
    // grab CSV data
    const handleChildData = (data:string[]) => {
        console.log(data)
        setProfile(data)
    }
    return (
      <div className="Profile">
        <h2>Profile</h2>
        <Upload onData={handleChildData} />
        <div>
          {profile && profile.map((d:string, i:number) =>
            <ImportedData data={d} index={i}/>  
          )}
        </div>
      </div>
    )
}

interface ImportType{
  data:string;
  index:number;
}

function ImportedData(props:ImportType){
  const [a, b, c] = props.data
  const index = props.index

  const flip = index % 2 === 0 ? 'light' : 'dark';

  if(index === 0){
    return(
      <div className="eby-component-flex eby-header-style">
        <h3  key={'id-' + c}>{a}</h3>
        <h3  key={a + b}>{b}</h3>
        <h3 key={b + c}>{c}</h3>
      </div>
    )
  }
  return(
    <div className={`eby-component-flex eby-row-color-${flip}`}>
      <span key={'id-' + c}>{a}</span>
      <span key={a + '-' + b}>{b}</span>
      <span key={a + '-' + c}>{c}</span>
    </div>
  )
}

function DrogDrop(){
  const [draggable, setDraggable] = React.useState({});

  const handleDragStart = (event:DragEvent) => {
      const draggedItem = event.target;
      setDraggable({ draggedItem });
  }
  const handleDrop = (event:DragEvent) => {
      event.preventDefault();
  
      const dropTarget = event.target;
  
      if (draggable && dropTarget) {
        // do something with the dragged item and drop target
        console.log(draggable, dropTarget)
      }
  
      setDraggable({});
    }
  
    const handleDragOver = (event:DragEvent) => {
      event.preventDefault();
    }
  return (
    <div className="Drag">
      <h2>Drag</h2>
      <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
      >
      <div
        className="draggable-item"
        draggable
        onDragStart={handleDragStart}
      >
        Drag 1!
      </div>
      <div
        className="draggable-item"
        draggable
        onDragStart={handleDragStart}
      >
        Drag 2!
      </div>
      {draggable && (
        <div className="drop-target">
          Drop here!
        </div>
      )}

    </div>
    </div>
  )


}
  
  export default Profile
  