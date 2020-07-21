import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faMinus } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from './Autocomplete';

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
       const {name, dateSinceAccomodation, dateToAccomodation, address, telephone, nrOfReservation, timeOfCheckIn, 
                timeOfCheckOut, amenities, notes, id, openingHours } = this.props.accomodations;
        const {changeHandler, index , idCountry, onClickHandler, deletePoint} = this.props
        const inValidCheckDate = this.props.validationDateSinceAccomodation.length && this.props.validationDateSinceAccomodation.filter(elem=>elem.index===index).length ? this.props.validationDateSinceAccomodation.filter(elem=>elem.index===index)[0] : '';
        const errorDate = inValidCheckDate ? inValidCheckDate.isInvalid : '';
        const messageDate  = errorDate ? inValidCheckDate.message : '';
        const inValidCheckTime = this.props.validationTimeCheckAccomodation.length && this.props.validationTimeCheckAccomodation.filter(elem=>elem.index===index).length ? this.props.validationTimeCheckAccomodation.filter(elem=>elem.index===index)[0] : '';
        const errorTime = inValidCheckTime ? inValidCheckTime.isInvalid : '';
        const messageTime  = errorTime ? inValidCheckTime.message : '';
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
             <Autocomplete key={id} onSelect={this.props.onSelect} disabled={this.props.disabled} class={"accomodations"} valueProp={name} onChange={changeHandler} id={id} idCountry={idCountry} onClick={onClickHandler}/>
             <button style={{pointerEvents:this.props.disabled && 'none', opacity: this.props.disabled && '0.4'}} className="circle-action-button" onClick={this.toggleHidden}>{this.state.isHidden ? <FontAwesomeIcon icon={faChevronDown} size="1x" color="#969798"/> : <FontAwesomeIcon icon={faChevronUp} size="1x" color="#969798"/>}</button>
             </div> 
             </div>
             </div> 
             {index!==(this.props.indexesAcc.length && this.props.indexesAcc[this.props.indexesAcc.length-1])  &&  <span onClick={()=>{deletePoint(idCountry, id, 'accomodations')}} className="delete-item"><span><FontAwesomeIcon icon={faMinus} size="1x" color="#ff1100"/></span>usuń nocleg</span>}
             </div>
         </div>
         
     
     </div>    
    <div style={{visibility:!this.state.isHidden ? 'visible':'hidden'}} className={"more-info input-wrapper " + (!this.state.isHidden ? 'open':'closed')}>
    <div className="input">
        <div className="validation">
            <div className="date-select">
                    <div>
                    <label>Od</label>
                    <input className="accomodations element" type="date" name="dateSinceAccomodation" min={this.props.dateSince} max={this.props.dateTo} value={dateSinceAccomodation} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                    <div>
                    <label>Do</label>
                    <input className="accomodations element" type="date" name="dateToAccomodation" min={this.props.dateSince} max={this.props.dateTo} value={dateToAccomodation} onChange={changeHandler(idCountry, id)}/>
                    </div>
            </div>
            <div className={errorDate && 'error-block'}>
                         {messageDate}
                     </div>
            
        </div>
            </div>
                <div >
                    <div>
                    <label>Adres</label>
                    <input className="accomodations element" name="address" value={address} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Godziny otwarcia</label>
                    <textarea className="accomodations element" name="openingHours" value={openingHours} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Telefon</label>
                    <input className="accomodations element" name="telephone" value={telephone} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Nr rezerwacji</label>
                    <input className="accomodations element" name="nrOfReservation" value={nrOfReservation} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div className="date-select">
                    <div>
                    <label>Czas zameldowania</label>
                    <input type="time" className="accomodations element" name="timeOfCheckIn" value={timeOfCheckIn} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                    <div>
                    <label>Czas wymeldowania</label>
                    <input type="time" className="accomodations element" name="timeOfCheckOut" value={timeOfCheckOut} onChange={changeHandler(idCountry, id)}/>
                    </div>
                 </div>
                 <div className={errorTime && 'error-block'}>
                         {messageTime}
                     </div>
                <div >
                    <div>
                    <label>Udogodnienia</label>
                    <input className="accomodations element" name="amenities" value={amenities} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
                <div >
                    <div>
                    <label>Uwagi</label>
                    <input className="accomodations element" name="notes" value={notes} onChange={changeHandler(idCountry, id)}/>
                    </div>          
                </div>
    </div>
     </div>
  )
 }
}
export default Accomodation