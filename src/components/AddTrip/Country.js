import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import Destination from './Destination'
import Accomodation from './Accomodation'
import { connect } from 'react-redux';



class Country extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            isHidden: true,
            howManyDestinations:'',
           }
           this.toggleHidden=this.toggleHidden.bind(this);       
    }
   
    toggleHidden(e){
     e.preventDefault();
     this.setState((prevState)=>({isHidden: !prevState.isHidden}))
    }
    
 render(){
    const countryName = this.props.countries.map(country => {
        return <option key={country.id} id={country.id} value={country.name}>{country.name}</option>;
    })
    this.props.destinations.filter((mappedObject) => 
       { return mappedObject.idCountry===this.props.countryObject.idCountry}
    )
     const {nameCountry, id} = this.props.countryObject;
     const {submitted, formErrors, changeNewComponentHandler,
    idxCountry, changeNewComponentCountryNameHandler, deleteCountry} = this.props

    const inValidCheck = this.props.validationTripNameAccomodation.length && this.props.validationTripNameAccomodation.filter(elem=>elem.index===idxCountry).length ? this.props.validationTripNameAccomodation.filter(elem=>elem.index===idxCountry)[0] : ''
    const error = inValidCheck ? inValidCheck.isInvalid : '';
    const message  = error ? inValidCheck.message : '';
    let indexesAcc = [];
    let indexesDes = [];
    this.props.accomodations.forEach((mappedObject, index) => {
        if(mappedObject.idCountry===id){
            indexesAcc.push(index)
        }
    })
    this.props.destinations.forEach((mappedObject, index) => {
        if(mappedObject.idCountry===id){
            indexesDes.push(index)
        }
    })

    return(
         <div className="country-part">
         <div> 
        <div className="input-wrapper">
                <div className="validation icon-input">
                <span className="main-category country"></span>
                <div className="main-category-input">
                <label>Nazwa państwa: </label>
                <select name="nameCountry" value={nameCountry} onChange={changeNewComponentCountryNameHandler(idxCountry)} className="countries">
                <option value=''  >Wybierz państwo</option>
                {countryName}
            </select>
           
             </div>
            
             </div>
             <div className={error && 'error-block'}>
                         {(submitted) && message}
                     </div>
             {this.props.countriesLength!==1 &&  <span onClick={()=>{deleteCountry(id)}} className="delete-item"><span><FontAwesomeIcon icon={faMinus} size="1x" color="#ff1100"/></span>usuń kraj</span>}
        </div>
            <div className="add-trip-1-1">
             <div>
            <h4>Dodaj cel podróży</h4>
            {this.props.destinations.map((mappedObject, index) => (
                        mappedObject.idCountry===id && (<Destination indexesDes={indexesDes} deletePoint={this.props.deletePoint} onSelect={this.props.onSelect} disabled={mappedObject.disabled} key={mappedObject.id} index={index} changeHandler={changeNewComponentHandler} destinations={mappedObject}
                            idCountry={id} onClickHandler={this.props.onClickHandler} destinationsLength={this.props.destinations.filter(element=>{return element.idCountry===id}).length} />   )
                    ))}
            </div>
            <div>
            <h4>Dodaj nocleg</h4>
            {this.props.accomodations.map((mappedObject, index) => (
                         mappedObject.idCountry===id && <Accomodation id={mappedObject.id} indexesAcc={indexesAcc} disabled={mappedObject.disabled} key={mappedObject.id} index={index} value={index} changeHandler={changeNewComponentHandler}
                         accomodations={mappedObject} submitted={submitted} formErrors={formErrors} idCountry={id}
                         onClickHandler={this.props.onClickHandler} dateSince={this.props.dateSince} dateTo={this.props.dateTo}
                         deletePoint={this.props.deletePoint} onSelect={this.props.onSelect}
                         accomodationsLength={this.props.accomodations.filter(element=>{return element.idCountry===id}).length}
                         validationDateSinceAccomodation={this.props.validationDateSinceAccomodation} 
                         validationTimeCheckAccomodation={this.props.validationTimeCheckAccomodation}
                         /> 
                    ))}
            </div>
            </div>
            </div>
          </div>
     )
    
 }
}

function mapState(state) {
    const { countries } = state.getCountries;
    return { countries };
}

export default connect(mapState)(Country);

