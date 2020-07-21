import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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
     const {addressdestination, openingHours, timeOfVisit, mainInformations,costs, name, id, idField} = this.props.destinations
     const {changeHandler, index, idxCountry, onClickHandler, idCountry} = this.props
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
             <input disabled={this.props.disabled} className="destinations" name="name"  value={name} onChange={changeHandler(idField, id)} onClick={onClickHandler(idCountry, id)}/>
             <button style={{pointerEvents:this.props.disabled && 'none', opacity: this.props.disabled && '0.4'}} className="circle-action-button" onClick={this.toggleHidden}>{this.state.isHidden ? <FontAwesomeIcon icon={faChevronDown} size="1x" color="#fa7e2e"/> : <FontAwesomeIcon icon={faChevronUp} size="1x" color="#fa7e2e"/>}</button>
             </div> 
             </div>
             </div> 
             </div>
         </div>
     </div>    
    {!this.state.isHidden && <div className="more-info input-wrapper">
                <div >
                    <div>
                    <label>Adres</label>
                    <input className="destinations" name="addressdestination" value={addressdestination} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Godziny otwarcia</label>
                    <input className="destinations" name="openingHours" value={openingHours} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Czas zwiedzania</label>
                    <input className="destinations" name="timeOfVisit" value={timeOfVisit} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Najważniejsze informacje</label>
                    <input className="destinations" name="mainInformations" value={mainInformations} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Koszty</label>
                    <input className="destinations" name="costs" value={costs} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
    </div>}
     </div>
  )
 }
}
export default destination
