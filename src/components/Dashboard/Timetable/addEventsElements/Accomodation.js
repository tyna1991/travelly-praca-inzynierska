import React from 'react';
import FormErrors from './../../../FormErrors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

class Accomodation extends React.Component{
    constructor(props){
        super(props)
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
       const {name, dateSinceAccomodation, dateToAccomodation, addressAccomodation, telephone, nrOfReservation, timeOfCheckIn, 
                timeOfCheckOut, amenities, notes, dateValid, id } = this.props.accomodations;
        const {changeHandler, submitted, formErrors, idxCountry, index , idCountry, onClickHandler} = this.props
  return(
     <div>
     <div className="choose-accomodation">
         <div>
             <div className="input-wrapper">
            <div className="icon-input">
            <span className="main-category accomodation" style={{opacity: this.props.disabled && '0.4'}}></span>
             <div className="main-category-input">
             <label>Nazwa noclegu: </label>
             <div className="icon-input">
             <input disabled={this.props.disabled} className="accomodations" name="name"  value={name} onChange={changeHandler(idField, id)} onClick={onClickHandler(idCountry, id)}/>
                <button style={{pointerEvents:this.props.disabled && 'none', opacity: this.props.disabled && '0.4'}} className="circle-action-button" onClick={this.toggleHidden}>{this.state.isHidden ? <FontAwesomeIcon icon={faChevronDown} size="1x" color="#fa7e2e"/> : <FontAwesomeIcon icon={faChevronUp} size="1x" color="#fa7e2e"/>}</button>
             </div> 
             </div>
             </div> 
             </div>
         </div>
         
     
     </div>    
    {!this.state.isHidden && <div className="more-info input-wrapper">
    <div className="input">
        <div className="validation">
            <div className="date-select">
                    <div>
                    <label>Od</label>
                    <input className="accomodations" type="date" name="dateSinceAccomodation" value={dateSinceAccomodation} onChange={changeHandler(idField, id)}/>
                    </div>          
                    <div>
                    <label>Do</label>
                    <input className="accomodations" type="date" name="dateToAccomodation" value={dateToAccomodation} onChange={changeHandler(idField, id)}/>
                    </div>
            </div>
            {(submitted && this.props.accomodations.dateValid===false) && <FormErrors formErrors={formErrors} />}
        </div>
            </div>
                <div >
                    <div>
                    <label>Adres</label>
                    <input className="accomodations" name="addressAccomodation" value={addressAccomodation} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Telefon</label>
                    <input className="accomodations" name="telephone" value={telephone} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Nr rezerwacji</label>
                    <input className="accomodations" name="nrOfReservation" value={nrOfReservation} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Czas zameldowania</label>
                    <input className="accomodations" name="timeOfCheckIn" value={timeOfCheckIn} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Czas wymeldowania</label>
                    <input className="accomodations" name="timeOfCheckOut" value={timeOfCheckOut} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Udogodnienia</label>
                    <input className="accomodations" name="amenities" value={amenities} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Uwagi</label>
                    <input className="accomodations" name="notes" value={notes} onChange={changeHandler(idField, id)}/>
                    </div>          
                </div>
    </div>}
     </div>
  )
 }
}
export default Accomodation