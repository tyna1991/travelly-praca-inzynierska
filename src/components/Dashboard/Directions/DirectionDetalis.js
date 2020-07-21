import React from 'react';
import './../../../App.css';


class DirectionDetalis extends React.Component{    
          
    render(){
        const options=[['samochód', 'DRIVING'], ['pieszo', 'WALKING'], ['rower', 'BICYCLING'], ['transport publiczny', 'TRANSIT']]
        return(
            <div>
             <div className='direction-info'>
                <div className='direction-bar'>
                    <div>
                    <span className='point-to-point-names'>{this.props.route}</span>
                    {/* <span className='time'><p>od <span>{this.props.getTimeOfStart()}</span> do <span>{this.props.getTimeOfEnd()}</span></p></span>  */}
                    </div>
                </div>
                <div className='point-to-point-detalis'>
                    <div className='point-to-point-info'>
                    <div><label>Środek transportu: <select name='modePolish' value={this.props.modePolish} onChange={this.props.onChangeHandler}>{options.map(mode=>{
                       return <option mode={mode[1]}>{mode[0]}</option>
                    })}</select></label></div>
                    <div>Czas podrózy: <span>{this.props.duration}</span></div>
                    <div>Długość: <span>{this.props.distance}</span></div>
                    {/* <div><label>Wyruszam o <input className='time-select'/></label></div>
                    <div><label>Jestem na miejscu o<input className='time-select'/></label></div> */}
                    </div>
                    <div className='point-to-point-map'>
                    <div id='map' className='map'></div>
                    <div id="right-panel"></div>
                    </div>
                    
                </div>
                
            </div>
            </div>
          
        )
    }
}

  export default(DirectionDetalis);