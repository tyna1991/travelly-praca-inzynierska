import React from 'react';
import { connect } from 'react-redux';
import {tripActions} from '../../../_actions/trip.actions'
import FormValidator from '../../FormValidator/FormValidator';
import Destination from './Destination'
import timeRangeCheck from '../../validations/timeRangeCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class ShowEvents extends React.Component{
    constructor(props){
    super(props)
    this.validator = new FormValidator([
        { 
            field: 'date',
            method: timeRangeCheck, 
            stateName:['events'],
            args:['since', 'to'],
            validWhen: true, 
            message: 'wybrany czas jest już zajęty' 
          }])
    
    this.state={
        tripId:this.props.tripId,
        destinations:this.props.selectedTrip.destinations,
        events:this.props.selectedTrip.events,
        submitted:false,
        formErrors: {date:''},
        formValid:true,
        validation: this.validator.valid(),
    }
    this.changeHandler=this.changeHandler.bind(this)
    this.submitHandler=this.submitHandler.bind(this)
  }
  componentDidMount(){
    // const events = this.state.events;
    // let arg={events}                 
    //this.validator.validate(arg)  
  }
  componentDidUpdate(prevProps){
    if(prevProps.selectedTrip.events!==this.props.selectedTrip.events){
        this.setState({
            ...this.state,
            events: this.props.selectedTrip.events
        })
    }
    if(prevProps.selectedTrip.destinations!==this.props.selectedTrip.destinations){
        this.setState({
            ...this.state,
            destinations: this.props.selectedTrip.destinations
        })
    }
  }
  changeHandler(index){
      return e=>{
        const {name, value} = e.target
        let eventsIndex=this.state.events[index];
        let modevents={...eventsIndex, [name]:value};
        let events=this.state.events;
        events[index]=modevents;
            this.setState({
                events
        },() => {
            if(name==="since" || name==="to"){
                this.validateDateField(name, index)
            }});   
      }
            
    }
    validateDateField(name, index) {
        let fieldValidationErrors = this.state.formErrors;
        let hoursCheck;
        let since;
        let to;
        since = this.state.events[index].since;
        to = this.state.events[index].to;
        hoursCheck = since<to;
        let events=this.state.events;
        let event=this.state.events[index];
        let modEvent = {...event, hoursValid:hoursCheck}
        events[index]=modEvent;
        let dateValidationsCheck = true;
        for (var i=0; i< events.length; i++){
            if(events[i].hoursValid===false){
                dateValidationsCheck = false;
                break;
            }
        }
        fieldValidationErrors.date = dateValidationsCheck ? '' : 'Podaj poprawny przedział czasowy';
        this.setState({formErrors: fieldValidationErrors,
            events
                      }, 
                      this.validateForm(dateValidationsCheck));
        }
        validateForm(dateValidationsCheck) {
            this.setState({formValid: dateValidationsCheck});
          }
          submitHandler(e){
            e.preventDefault();
            const events = this.state.events;
            let arg={events};
            const validation = this.validator.validate(arg);
            this.setState({...this.state, validation, submitted:true });
            if(validation.isValid){
                this.setState({
                    ...this.state,
                    submitted:true
                })
                if(this.state.formValid){
                   this.props.modifyEvents(this.props.tripId, this.state.events);
                    this.props.closeModal();
                }
            }
          }
          
    render(){
    const events = this.state.events;
    let arg={events}
    let validation = this.state.submitted ?                   
                    this.validator.validate(arg):  
                    this.state.validation 
        const destinationsByCountry = this.props.selectedTrip.countries.map(country=>{
            let destinations=[];
            
            this.state.destinations.forEach((destination)=>{
                country.id === destination.idCountry && destinations.push(destination)
             }) 
             return ( <Destination destinations={destinations} changeHandler={this.changeHandler}
                        submitted={this.state.submitted} formErrors={this.state.formErrors}
                        dateSince={this.props.selectedTrip.trip.dateSince} dateTo={this.props.selectedTrip.trip.dateTo}
                        events={this.state.events}
                        country={this.props.selectedTrip.countries.filter(element=>{return element.id===country.id})}
                        //country={country}
                        validationTime={validation.date}
                        /> ) 
        })

        return(
            <div className="modal show-event-modal" id="myModal" style={{display:this.props.changeModal ? 'block' : 'none'}}>
                <div className="modal-content" id="scrollbar-custom">
                <button className="close" name="showEvents" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
            <h3 className="title">Twoje wydarzenia</h3>
            <form className="show-events">
                {destinationsByCountry}
                    <div>
                    {this.state.destinations.length ? <button className="action-button center-button" onClick={this.submitHandler}>Zapisz</button>
                    : <button className="action-button center-button" name="addEvents" onClick={this.props.modalAddEventsChange}>Dodaj nowe wydarzenia</button>}
                    </div>
            </form>
            </div>
            </div>

        )
    }
}
function mapState(state) {
    const { loading } = state.getTrip;
    return { loading};
}

const actionCreators = {
    modifyEvents: tripActions.modifyEvents,
    
}

export default connect(mapState, actionCreators)(ShowEvents);