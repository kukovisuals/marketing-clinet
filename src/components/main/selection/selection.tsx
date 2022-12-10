import './selection.css'

function Selection() {

    return (
      <div className="Selection">
        <h2>Selection</h2>
        <div className="eby-wrapper-selection">
            <div className="eby-component-flex">
                <div className="eby-selection-list">
                    collateral: INSERT
                </div>
                <div className="eby-selection-list">
                    <span className="a-ref-element">Change</span>
                </div>
                <div className="eby-selection-list">
                    <span className="a-ref-element">Remove</span>
                </div>
                <div className="eby-selection-list">
                    <div>
                        <select name="months" id="managaMonths">
                            <option value="jan">Jan</option>
                            <option value="feb">Feb</option>
                            <option value="mar">Mar</option>
                            <option value="apr">Apr</option>
                            <option value="may">May</option>
                            <option value="jun">Jun</option>
                            <option value="jul">Jul</option>
                            <option value="aug">Aug</option>
                            <option value="sep">Sep</option>
                            <option value="oct">Oct</option>
                            <option value="nov">Nov</option>
                            <option value="dec">Dec</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default Selection
  