import React from 'react';
import { connect } from 'react-redux';
import {tripActions} from '../../../_actions/trip.actions'
import Destination from './../../AddTrip/Destination'
import {countryActions} from './../../../_actions/country.actions';
import Preloader from '../../Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Warning from './../../AddTrip/Warning';


class AddEvents extends React.Component{
    constructor(props){
    super(props)
    this.state={
            id:this.props.tripId,
            showWarning:false,
            warningMessage:'',
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
                idEvent:'',
            }],  
            formErrors: {date:'Podaj poprawną datę'},
            formValid:true,
            submitted:false,
            
        }
    
    this.submitHandler=this.submitHandler.bind(this)
    this.addNewComponent=this.addNewComponent.bind(this)
    this.changeNewComponentHandler=this.changeNewComponentHandler.bind(this)
    this.onClickHandler=this.onClickHandler.bind(this)
    this.deletePoint=this.deletePoint.bind(this)
    this.onSelect=this.onSelect.bind(this)
    this.postData=this.postData.bind(this)
    this.closeWarning=this.closeWarning.bind(this)
    
  }
  eventNames=[];

  
  onClickHandler(idCountry, idElement){
    return e=>{
        e.preventDefault();
        const className = e.target.className.substring(0, e.target.className.indexOf(' '));
        if(!e.target.classList.contains("countries")){
            let elementsByIdField = this.state[className].filter((object)=>{
                return object.idCountry === idCountry;
            })
            this.state[className].forEach((object)=>{
                if (idCountry===object.idCountry && (className==="destinations" && object.id===idElement)){
                    let indexOfElementById = elementsByIdField.findIndex(element=> {
                        return element.id === idElement   
                    })
                    if(indexOfElementById === elementsByIdField.length-1 && elementsByIdField[indexOfElementById+1]===undefined){
                        this.addNewComponent(idCountry, className)
                    }
            } 
        })
    }
}
  }
addNewComponent(idCountryCheck, name){
    let idCountry = idCountryCheck;
    let points = this.state[name].filter(element=>{return element.idCountry===idCountry});
    const id = points.length ? Math.max(...points.map(element=>element.id))+1 : 1;
    if (name==="destinations"){
      let newDestination = {
              disabled:true,
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
          }
          let destinations=this.state.destinations;
          destinations=[...destinations, newDestination]
          this.setState({
              ...this.state,
              destinations,
          })
  } 
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
        let destinations = className==="destinations" ? elements : this.state.destinations;
            this.setState({
                ...this.state,
                destinations
            })
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
        let destinations = className==="destinations" ? elements : this.state.destinations;
            this.setState(prevState=>{return{
                ...this.state,
                destinations
            }})
}}
  componentDidMount(){
    this.props.getCountries()
      let destinations=[];
      this.props.selectedTrip.countries.forEach(country=>{
        destinations.push({
                disabled:false,
                tripId:'',
                idCountry:country.id,
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
        })
      })
     
      this.setState({
          ...this.state,
          destinations
      })
  }

 
  submitHandler(e){
    e.preventDefault();
    this.setState({
        submitted:true
    })
    const emptyNameDestinations= this.state.destinations.filter(el=>{
            return !el.name
    })
     var isFilledDestination=false;
     emptyNameDestinations.length && emptyNameDestinations.forEach(obj=>{
                if(obj['address'] || obj['openingHours'] || obj['timeOfVisit'] || obj['mainInformations'] || obj['costs']){
                    isFilledDestination=true 
                }
     })
        this.setState({
            ...this.state,
            showWarning:isFilledDestination,
            warningMessage:'Znaleziono nieuzupełnioną nazwę celu podróży.',
        }, ()=>{
            if(!this.state.showWarning){
                this.postData(e);
            }
        })
}
deletePoint(idCountry, id, stateName){
    let maxId;
      let points=this.state[stateName].filter(element=>{return !(element.idCountry===idCountry && element.id===id)})
      let elementsByIdCountry = this.state[stateName].filter((object)=>{
        return object.idCountry === idCountry;
        })
      maxId=Math.max(...elementsByIdCountry.map(element=>element.id))  
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
    closeWarning(){
    this.setState(prevState=>{
        return{
            ...this.state,
            showWarning:!prevState.showWarning
        }
    })
}
postData(e){
    const destinations=this.state.destinations.filter(destination=>{return destination.name!==''});
    this.props.addEventsToTrip(destinations, this.state.id);
    this.props.closeModal(e);
}
         
    render(){
    
         return(
            <div className="modal add-event-modal" id="myModal" style={{display:this.props.changeModal ? 'block' : 'none'}}>
             {this.props.loading && <Preloader/>}
            <div className="modal-content" id="scrollbar-custom">
            <button className="close" name="addEvents" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
            <h3 className='title'>Dodaj wydarzenie</h3>
            <form>
            {this.props.selectedTrip.countries.map((country, index) => {
            const {id}=country
            let indexesDes = [];
            this.state.destinations.forEach((mappedObject, index) => {
                if(mappedObject.idCountry===id){
                    indexesDes.push(index)
                }
            })
            return (
               <div key={index}>
                <div className="input"> 
                <div className="input-wrapper">        
                <div>
                    <p><span>Państwo: </span><b>{country.name}</b></p>
                <div className="input">
                {this.state.destinations.map((mappedObject, index) => (
                        (mappedObject.idCountry===country.id) ? (<Destination indexesDes={indexesDes} deletePoint={this.deletePoint} onSelect={this.onSelect} disabled={mappedObject.disabled} checkkey={index.toString()+id.toString()} key={index} index={index} changeHandler={this.changeNewComponentHandler} destinations={mappedObject}
                            idCountry={id} onClickHandler={this.onClickHandler} destinationsLength={this.state.destinations.filter(element=>{return element.idCountry===id}).length} 
                            
                            />   ) : ''
                    ))}
                </div>
                 </div>
                 </div>
                </div>
                </div>
            )})}
            </form>  
            <button className="action-button center-button" onClick={this.submitHandler}>Zapisz</button>
            </div>
            {this.state.showWarning && <Warning message={this.state.warningMessage} closeWarning={this.closeWarning} postData={this.postData}/>}
            </div>
         )
    }
}


function mapState(state) {
    const { countries, loading } = state.getCountries;
    return { loading, countries};
}

const actionCreators = {
    addEventsToTrip:tripActions.addEventsToTrip,
    getCountries:countryActions.getAllCountries
}


export default connect(mapState, actionCreators)(AddEvents)