import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faMinus } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from './Autocomplete';


class destination extends React.Component{
    constructor(){
        super()
        this.state = {
            ...this.state,
            isHidden: true,
           }
           this.toggleHidden=this.toggleHidden.bind(this);  
    }

    toggleHidden(e){
        e.preventDefault();
     this.setState((prevState)=>({isHidden: !prevState.isHidden}))
    }
 render(){
     const {address, openingHours, timeOfVisit, mainInformations,costs, name, id} = this.props.destinations
     const {changeHandler, index, onClickHandler, idCountry, deletePoint} = this.props
  return(
     <div>
     <div className="choose-destination">
     <div>
             <div className="input-wrapper">
            <div className="icon-input">
            <span className="main-category destination" style={{opacity: this.props.disabled && '0.4'}}></span>
             <div className="main-category-input">
             <label>Nazwa celu: </label>
             <div className="icon-input">
             <Autocomplete key={id} onSelect={this.props.onSelect} disabled={this.props.disabled} class={"destinations"} valueProp={name} onChange={changeHandler} idCountry={idCountry} id={id} onClick={onClickHandler}/>
             <button style={{pointerEvents:this.props.disabled && 'none', opacity: this.props.disabled && '0.4'}} className="circle-action-button" onClick={this.toggleHidden}>{this.state.isHidden ? <FontAwesomeIcon icon={faChevronDown} size="1x" color="#969798"/> : <FontAwesomeIcon icon={faChevronUp} size="1x" color="#969798"/>}</button>
             </div> 
             </div>
             </div> 
             {index!==(this.props.indexesDes.length && this.props.indexesDes[this.props.indexesDes.length-1]) &&  <span onClick={()=>{deletePoint(idCountry, id, 'destinations')}} className="delete-item"><span><FontAwesomeIcon icon={faMinus} size="1x" color="#ff1100"/></span>usuń cel</span>}
             </div>
         </div>
     </div>    
    <div style={{visibility:!this.state.isHidden ? 'visible':'hidden'}} className={"more-info input-wrapper " + (!this.state.isHidden ? 'open':'closed')}>
                <div >
                    <div>
                    <label>Adres</label>
                    <input className="destinations element" name="address" value={address} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Godziny otwarcia</label>
                    <textarea className="destinations element" name="openingHours" value={openingHours} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Czas zwiedzania</label>
                    <input className="destinations element" name="timeOfVisit" value={timeOfVisit} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Dodatkowe informacje</label>
                    <input className="destinations element" name="mainInformations" value={mainInformations} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Koszty</label>
                    <input className="destinations element" name="costs" value={costs} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
    </div>
     </div>
  )
 }
}
export default destination
