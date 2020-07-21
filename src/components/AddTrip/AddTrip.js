import React from 'react';
import Country from './Country';
import { tripActions } from './../../_actions/trip.actions';
import { connect } from 'react-redux';
import {countryActions} from './../../_actions/country.actions';
import Trip from './Trip'
import dateValidation from './../validations/dateValidation';
import isEmpty from './../validations/isEmpty';
import timeCompare from './../validations/timeCompare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../_helpers/history'
import { withRouter } from 'react-router-dom'
import Preloader from '../Preloader';
import FormValidator from '../FormValidator/FormValidator';
import Warning from './Warning';
import dateRange from '../validations/dateRange';
import { alertActions } from '../../_actions/alert.actions';
import isCountryDoubled from '../validations/isCountryDoubled';



class AddTrip extends React.PureComponent{
constructor(props){
    super(props)
    this.validator = new FormValidator([
        { 
            field: 'timeOfCheckIn',
            method: timeCompare, 
            stateName:['accomodations'],
            args:['timeOfCheckOut', 'dateSinceAccomodation', 'dateToAccomodation'],
            validWhen: false, 
            message: 'podaj poprawny czas' 
          },
        { 
            field: 'dateSinceAccomodation',
            method: dateValidation, 
            stateName:['accomodations'],
            args:['dateToAccomodation'],
            validWhen: true, 
            message: 'wprowadź poprawną datę' 
          },
          
          { 
            field: 'nameCountry',
            method: isEmpty, 
            stateName:['countries'],
            validWhen: true, 
            message: 'pole Państwo jest wymagane' 
          },
        { 
            field: 'dateSince',
            method: dateValidation, 
            stateName:['trip'],
            args:['dateTo'],
            validWhen: true, 
            message: 'wprowadź poprawną datę' 
          },
          { 
            field: 'dateSince',
            method: isEmpty, 
            stateName:['trip'],
            validWhen: true, 
            message: 'pole Od nie może być puste' 
          },
          { 
            field: 'dateSinceAccomodation',
            method: dateRange, 
            stateName:['accomodations', 'trip'],
            args:['dateToAccomodation', 'dateSince', 'dateTo'],
            validWhen: false, 
            message: 'data noclegu nie mieści się w czasie trwania podróży' 
          },
          { 
            field: 'tripName',
            method: isEmpty, 
            stateName:['trip'],
            validWhen: true, 
            message: 'pole Nazwa podróży nie może być puste' 
          },
          { 
            field: 'dateTo',
            method: isEmpty, 
            stateName:['trip'],
            validWhen: true, 
            message: 'pole Do nie może być puste' 
          },
          { 
            field: 'nameCountry',
            method: isCountryDoubled,
            stateName:['countries'],
            validWhen: false, 
            message: 'te państwo zostało już dodane' 
          },
      ]);
    this.state={
        edition:false,
        showWarning:false,
        warningMessage:'',
        countries:[{
            name:'',
            nameCountry:'',
            id:9999,
            tripId:'',
            info:'',
        }],
        trip:{
            tripName : '',
            id:'',
            userId:'',
            dateSince:'',
            dateTo:'',
        },
        destinations:[{
                disabled:false,
                tripId:'',
                idCountry:9999,
                id:1,
                name:'',
                address:'',
                openingHours:'',
                timeOfVisit:'',
                mainInformations:'',
                costs:'',
                place_id:'',
                isOpen:'',
                idEvent:''
            }],  
            accomodations:[{
                disabled:false,
                tripId:'',
                id:1,
                idCountry:9999,
                name:'',
                dateSinceAccomodation:'',
                dateToAccomodation:'',
                address:'',
                telephone:'',
                nrOfReservation:'',
                timeOfCheckIn:'',
                timeOfCheckOut:'',
                amenities:'',
                notes:'',
                place_id:'',
                openingHours:'',
                isOpen:'',
                }],
        submitted:false,
        tempCountryId:9999,
        validation: this.validator.valid(),
    }
    this.changeHandler=this.changeHandler.bind(this)
    this.submitHandler=this.submitHandler.bind(this)
    this.addNewComponent=this.addNewComponent.bind(this)
    this.changeNewComponentHandler=this.changeNewComponentHandler.bind(this)
    this.changeNewComponentCountryNameHandler=this.changeNewComponentCountryNameHandler.bind(this)
    this.onClickHandler=this.onClickHandler.bind(this)
    this.deleteCountry=this.deleteCountry.bind(this)
    this.onSelect=this.onSelect.bind(this)
    this.deletePoint=this.deletePoint.bind(this)
    this.postData=this.postData.bind(this)
    this.closeWarning=this.closeWarning.bind(this)
    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
}
componentDidMount(){
    const accomodations = this.state.accomodations;
    const trip = this.state.trip;
    const countries = this.state.countries;
    let arg={accomodations, trip, countries}
    this.validator.validate(arg)
    this.props.getAllCountries();
    if(this.props.match.path.indexOf("edit-trip")>-1){
            this.props.getTrip(this.props.match.params.id, this.props.data);
          }  
          
}
componentDidUpdate(prevProps, prevState, snapshot){
if(prevProps.data!==this.props.data){
    if((this.props.data.countries || this.props.data.trip) && (this.props.edited!==undefined && this.props.edited)){
        let newAccomodations=[];
        newAccomodations.push(...this.props.data.accomodations);
        let newDestinations=[];
        newDestinations.push(...this.props.data.destinations)
        const accomodations = this.props.data.accomodations;
        const destinations=this.props.data.destinations;
        // accomodations.map(accomodation=>{accomodation.disabled=false; return accomodation})
        // destinations.map(destination=>{destination.disabled=false; return destination})
        this.props.data.countries.forEach(country=>{    
            let accomodationsFilteredByCountry = accomodations.filter(accomodation=>{return accomodation.idCountry===country.id});
            let pointsIntegerA = accomodationsFilteredByCountry.filter(element=>{return Number.isInteger(element.id)});
            const idA = pointsIntegerA.length ? Math.max(...pointsIntegerA.map(element=>element.id))+1  : 1;
            newAccomodations.push({
                disabled:false,
                tripId:country.tripId,
                id:idA,
                idCountry:country.id,
                name:'',
                dateSinceAccomodation:'',
                dateToAccomodation:'',
                address:'',
                telephone:'',
                nrOfReservation:'',
                timeOfCheckIn:'',
                timeOfCheckOut:'',
                amenities:'',
                notes:'',
                place_id:'',
                openingHours:'',
                isOpen:'',
            })
            let destinationsFilteredByCountry = destinations.filter(destination=>{return destination.idCountry===country.id});
            let pointsIntegerD = destinationsFilteredByCountry.filter(element=>{return Number.isInteger(element.id)});
            const idD = pointsIntegerD.length ? Math.max(...pointsIntegerD.map(element=>element.id))+1  : 1;
            newDestinations.push({
                    disabled:false,
                    tripId:country.tripId,
                    idCountry:country.id,
                    id:idD,
                    name:'',
                    address:'',
                    openingHours:'',
                    timeOfVisit:'',
                    mainInformations:'',
                    costs:'',
                    place_id:'',
                    isOpen:'',
                    idEvent:''
            })
        })
        this.setState({
            edition:true,
            trip: this.props.data.trip,
            countries: this.props.data.countries,
            accomodations : newAccomodations,
            destinations : newDestinations,
        })
        
    }  
}
}

changeDisabledState(indexOfDestination, bool, name, idCountry){
        let selectedFields = this.state[name].filter(object=>{return object.idCountry===idCountry});
        selectedFields[indexOfDestination] = {...selectedFields[indexOfDestination], disabled:bool}
        selectedFields.map((object, index)=>{if(index===indexOfDestination+1){
            if(object.name){
                return {...object, disabled:false}
            }else{
                return object
            }
        }else{
            return object
        }})
        let selectedState = this.state[name].filter(object=>{return object.idCountry!==idCountry});
        selectedState = [...selectedFields, ...selectedState]
        return selectedState
}    
onClickHandler(idCountry, idElement){
    return e=>{
        e.preventDefault();
        const className = e.target.className.substring(0, e.target.className.indexOf(' '));
        if(!e.target.classList.contains("countries")){
            let elementsByIdField = this.state[className].filter((object)=>{
                return object.idCountry === idCountry;
            })
            this.state[className].forEach((object)=>{
                if (idCountry===object.idCountry && ((className==="destinations" && object.id===idElement) 
                || (className==="accomodations" && object.id===idElement))){
                    let indexOfElementById = elementsByIdField.findIndex(element=> {
                        return element.id === idElement   
                    })
                    if(indexOfElementById === elementsByIdField.length-1 && elementsByIdField[indexOfElementById+1]===undefined){
                        this.addNewComponent(idCountry, className)
                    }
            } 
        })
        }else{
                this.addNewComponent(idCountry, e.target.name)
            }
        }
}
deletePoint(idCountry, id, stateName){
let maxId;
  let points=this.state[stateName].filter(element=>{return !(element.idCountry===idCountry && element.id===id)})
  let elementsByIdField = this.state[stateName].filter((object)=>{
    return object.idCountry === idCountry;
    })
  maxId=Math.max(...elementsByIdField.map(element=>element.id))  
  points = points.map(element=>{
    if(element.idCountry===idCountry && element.id===maxId){
        return {...element, disabled:false}
    }else{
        return element
    }
  })
  let newId=0
  points = points.map(element=>{
    if(element.idCountry===idCountry){
        newId=newId+1;
        return {...element, id:newId}
    }else{
        return element
    }
  })
  this.setState({
                    ...this.state,
                    [stateName]:points
  })
}
onSelect(idCountry, idElement,  name, address, openingHours, place_id, className){
   let elements = this.state[className].map((object)=>{
        if (idCountry===object.idCountry && object.id===idElement && address){
                   return {...object, name:name, address:address, openingHours:openingHours, place_id:place_id, disabled:false }
            }
        else{
            return object
        }
    })
    let accomodations = className==="accomodations" ? elements : this.state.accomodations
    let destinations = className==="destinations" ? elements : this.state.destinations;
        this.setState({
            ...this.state,
            accomodations,
            destinations
        })
}
changeNewComponentHandler(idCountry, idElement){
    return e => {
        const {name, value} = e.target;
        let changedState;
        const className = e.target.className.substring(0, e.target.className.indexOf(' '));
        let elementsByIdCountry = this.state[className].filter((object)=>{
            return object.idCountry === idCountry;
        })
        let indexOfElement = elementsByIdCountry.findIndex(element=> {
            return element.id === idElement
        })
            value ? changedState=this.changeDisabledState(indexOfElement+1, false, className, idCountry):
            indexOfElement !== elementsByIdCountry.length-2 ? changedState = this.state[className] 
            : changedState = this.changeDisabledState(indexOfElement+1, true, className, idCountry)
            let elements = changedState.map((object)=>{
                if (idCountry===object.idCountry && object.id===idElement){               
                  return {...object, [name]:value, disabled:false }             
                }
                else{
                    return object
                }
            })
            elementsByIdCountry = changedState.filter((object)=>{
                return object.idCountry === idCountry;
            })
            if(elementsByIdCountry[elementsByIdCountry.length-1].disabled && elementsByIdCountry[elementsByIdCountry.length-2].disabled){
                let newElements = elements.filter((element)=>{
                    return !(element.idCountry ===elementsByIdCountry[elementsByIdCountry.length-1].idCountry && element.id ===elementsByIdCountry[elementsByIdCountry.length-1].id)
               })
               elements=newElements
            }
            let accomodations = className==="accomodations" ? elements : this.state.accomodations
            let destinations = className==="destinations" ? elements : this.state.destinations;
                this.setState(prevState=>{return{
                    ...this.state,
                    accomodations,
                    destinations
                }}
                )
}}
closeWarning(){
    this.setState(prevState=>{
        return{
            ...this.state,
            showWarning:!prevState.showWarning
        }
    })
}
changeNewComponentCountryNameHandler(idxCountry){
    return e => {
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let optionId = optionElement.getAttribute('id');
        const {value, name} = e.target;
        let country=this.state.countries[idxCountry];
        const checkIfNotDoubled = this.state.countries.filter(element=>{
                return element.id === optionId && true
        })

        
        let prevId = this.state.countries[idxCountry].id;
        let destinations = this.state.destinations.map(object=>{
            if(object.idCountry===prevId && !checkIfNotDoubled.length){
                return {...object, idCountry:optionId }
            }
            else{
                return object
            }
        })
        let accomodationsState = this.state.accomodations.map(object=>{
            if(object.idCountry===prevId && !checkIfNotDoubled.length){
                return {...object, idCountry:optionId }
            }
            else{
                return object
            }
        })
        let modCountry=!checkIfNotDoubled.length ? {...country, [name]:value, id:optionId} : {...country, [name]:value, id:country.id}
        let countriesState=this.state.countries;
        countriesState[idxCountry]=modCountry;
        this.setState({
            ...this.state,
            countries:countriesState,
            destinations,
            accomodations:accomodationsState
        })
    
}
}
changeHandler(e){
    const {name, value} = e.target
    if (e.target.classList.contains('trip')){
        this.setState({
            trip:{
                ...this.state.trip,
                [name]:value
            } 
        })
    }else{
        this.setState({
            ...this.state,
            [name]:value
        })
    }
}

submitHandler(e){
    e.preventDefault();
    const accomodations = this.state.accomodations;
    const trip = this.state.trip;
    const countries = this.state.countries;
    let arg={accomodations, trip, countries}
    const validation = this.validator.validate(arg);
    this.setState({...this.state, validation, submitted:true });
    if(validation.isValid)
     {  const emptyNameAccomodations = this.state.accomodations.filter(el=>{
            return !el.name
        })
        const emptyNameDestinations= this.state.destinations.filter(el=>{
            return !el.name
        })
        var isFilledAccomodation=false;
        emptyNameAccomodations.length && emptyNameAccomodations.forEach(obj=>{
                if(obj['dateSinceAccomodation'] || obj['dateToAccomodation'] || obj['address'] || obj['telephone'] || obj['nrOfReservation'] || obj['timeOfCheckIn'] || obj['timeOfCheckOut'] || obj['amenities'] || obj['notes']){
                    isFilledAccomodation=true 
                }
        })
        var isFilledDestination=false;
        emptyNameDestinations.length && emptyNameDestinations.forEach(obj=>{
                if(obj['address'] || obj['openingHours'] || obj['timeOfVisit'] || obj['mainInformations'] || obj['costs']){
                    isFilledDestination=true 
                }
        })
        this.setState({
            ...this.state,
            showWarning:(isFilledDestination || isFilledAccomodation) && true,
            warningMessage:isFilledAccomodation ? 'Znaleziono nieuzupełnioną nazwę noclegu.' : isFilledDestination ? 'Znaleziono nieuzupełnioną nazwę celu podróży.' : '',
        }, ()=>{
            if(!this.state.showWarning){
                this.postData();
            }
        })
    } 
}
postData(){
    this.props.setTrip(this.state.trip, this.state.countries, this.state.destinations, this.state.accomodations, this.state.edition)
}
  addNewComponent(idCountryCheck, name){
      let currentCountry = this.state.countries.filter(country=>{
          return country.id===idCountryCheck
        })
        let idCountry = currentCountry.length ? currentCountry[0].id : this.state.tempCountryId+1;
        let points = this.state[name].filter(element=>{return element.idCountry===idCountry});
        let pointsInteger = points.filter(element=>{return Number.isInteger(element.id)});
        const id = pointsInteger.length ? Math.max(...pointsInteger.map(element=>element.id))+1  : 1;
      if (name==="destinations" || name==="countries"){
        let newDestination = {
                disabled:name==="countries"? false : true,
                tripId:'',
                idCountry:idCountry,
                id:id,
                name:'',
                address:'',
                openingHours:'',
                timeOfVisit:'',
                mainInformations:'',
                costs:'',
                place_id:'',
                isOpen:'',
                idEvent:''
            }
            let destinations=this.state.destinations;
            destinations=[...destinations, newDestination]
            this.setState({
                ...this.state,
                destinations,
            })
    } 
    if (name==="accomodations" || name==="countries"){
        let newAccomodation = {
                disabled:name==="countries"? false : true,
                tripId:'',
                idCountry:idCountry,
                id:id,
                name:'',
                dateSinceAccomodation:'',
                dateToAccomodation:'',
                address:'',
                telephone:'',
                nrOfReservation:'',
                timeOfCheckIn:'',
                timeOfCheckOut:'',
                amenities:'',
                notes:'',
                place_id:'',
                openingHours:'',
                isOpen:'',
                }
                let accomodations=this.state.accomodations;
                accomodations=[...accomodations, newAccomodation]
                this.setState(prevState=>{
                    return {
                    ...this.prevState,
                    accomodations
                    }
                    })
        }
        if (name==="countries"){
            let country={
                name:'',
                id:this.state.tempCountryId+1,
                tripId:'',
                // info:''
            }
            this.setState(prevState=>{
                return {
                    ...this.prevState,
                    tempCountryId:prevState.tempCountryId+1,
                    countries:[...this.state.countries, country]
                };
            })
        }
        }  
        deleteCountry(idCountry){
                const countries=this.state.countries.filter(country=>{return country.id!==idCountry})
                const accomodations=this.state.accomodations.filter(accomodation=>{return accomodation.idCountry!==idCountry})
                const destinations=this.state.destinations.filter(destination=>{return destination.idCountry!==idCountry})
                this.setState({
                    ...this.state,
                    countries,
                    accomodations,
                    destinations
                })
        }  
  
render(){
    const accomodations = this.state.accomodations;
    const trip = this.state.trip;
    const countries = this.state.countries;
    let arg={accomodations, trip, countries}
    let validation = this.state.submitted ?                   
                   this.validator.validate(arg):  
                      this.state.validation 
    return(
        <div className="container add-trip-container">
              {((this.props.alert.message) &&
                           <div className={`alert ${this.props.alert.type}`}>{this.props.alert.message}</div>)
                        || ((alert.message) &&
                            <div className={`alert ${this.props.alert.type}`}>{this.props.alert.message}</div>)
                        }
        {this.props.loading && <Preloader/>}
        <form className="add-trip">
        <span onClick={history.goBack} className="go-back-button"><FontAwesomeIcon icon={faChevronLeft} size="1x" color="#FA7E2E" /> Wróć</span>
        {this.props.match.path === "/home/add-trip" ? <h1>Dodaj podróż</h1> : <h1>Edytuj podróż</h1>}
            <Trip tripName={this.state.trip.tripName} dateSince={this.state.trip.dateSince} 
            dateTo={this.state.trip.dateTo} changeHandler={this.changeHandler} 
            validationDateSinceIsInvalid={validation.dateSince.isInvalid} validationDateSinceMessage={validation.dateSince.message}
            validationDateToIsInvalid={validation.dateTo.isInvalid} validationDateToMessage={validation.dateTo.message}
            validationTripNameIsInvalid={validation.tripName.isInvalid} validationTripNameMessage={validation.tripName.message}
            />
            <div className="input">
            {this.state.countries.map((mappedObject, index) => (
                         <Country key={index} idxCountry={index} countriesLength={this.state.countries.length}
                         changeNewComponentHandler={this.changeNewComponentHandler}
                         submitted={this.state.submitted} formErrors={this.state.formErrors}
                         addNewComponent={this.addNewComponent} changeHandler={this.changeHandler} 
                         countryObject={mappedObject} destinations={this.state.destinations}
                         accomodations={this.state.accomodations}
                         changeNewComponentCountryNameHandler={this.changeNewComponentCountryNameHandler}
                         onClickHandler={this.onClickHandler} deleteCountry={this.deleteCountry}
                         dateSince={this.state.trip.dateSince} dateTo={this.state.trip.dateTo}
                         onSelect={this.onSelect} deletePoint={this.deletePoint}
                         validationDateSinceAccomodation={validation.dateSinceAccomodation}
                         validationTimeCheckAccomodation={validation.timeOfCheckIn}
                         validationTripNameAccomodation={validation.nameCountry}
                         /> 
                    ))}
            </div>
            <div className="trip-buttons center-button">
            <button className="action-button countries light" name="countries" onClick={this.onClickHandler(null)}>Dodaj państwo</button>    
            <button className="action-button" onClick={this.submitHandler}>Zapisz</button>
            </div>
            
         
        </form>
        {this.state.showWarning && <Warning message={this.state.warningMessage} closeWarning={this.closeWarning} postData={this.postData}/>}
        </div>
    )
}
}
function mapState(state) {
    const {  data, loading, edited } = state.getTrip;
    const { countries } = state.getCountries;
    const { alert } = state;
    return { loading, countries, data, alert, edited };
}

const actionCreators = {
    setTrip: tripActions.setTrip,
    getTrip: tripActions.getTripToEdit,
    getAllCountries: countryActions.getAllCountries,
    clearAlerts: alertActions.clear
}

export default withRouter(connect(mapState, actionCreators)(AddTrip));