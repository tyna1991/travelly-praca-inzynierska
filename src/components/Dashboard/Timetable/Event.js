import React from 'react';
import SingleEventStyled from './SingleEventStyled';
import SingleReservationStyled from './SingleReservationStyled';


class Event extends React.Component{
    constructor(props){
    super(props)
    this.state={
    selectedEvents:[],
    selectedReservations:[]
  }}
 
  componentDidMount(){
    this.createEvents()
    this.createReservations()
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.events !== prevProps.events || this.props.destinations !== prevProps.destinations) {
        this.createEvents();
        this.createReservations()
    }
    if (this.props.timelineStart !== prevProps.timelineStart || this.props.timelineEnd !== prevProps.timelineEnd) {
      this.createEvents();
      this.createReservations();
  }
  }
    createEvents(){
      let selectedEvents=[]
        this.props.events.forEach((event, index)=>{
            let newDate = (event.since!=='' && event.to!=='') && new Date(event.date);
            if(this.isValidDate(newDate) && this.isValidDate(this.props.date)){
                if(newDate.toLocaleDateString()===this.props.date.toLocaleDateString()){
                  const destination = this.props.destinations.filter(destination=>{return destination.id===event.destination})
                        const name = destination.length ? destination[0].name : '';
                        selectedEvents.push( 
                          <SingleEventStyled key={index} name={name} index={index} onClickHandler={this.props.openModal} start={event.since} end={event.to} color={event.color} timelineStart={this.props.timelineStart}/>
                        )
                }
            }
        })
        this.setState({
          selectedEvents
        })
    }
    createReservations(){
      let selectedReservations=[]
        this.props.accomodations.forEach((accomodation, index)=>{
            let dateSince = accomodation.timeOfCheckIn && new Date(accomodation.dateSinceAccomodation)
            let dateTo = accomodation.timeOfCheckOut && new Date(accomodation.dateToAccomodation)
            if(this.isValidDate(dateSince) && this.isValidDate(this.props.date)){
                if(dateSince.toLocaleDateString()===this.props.date.toLocaleDateString()){
                        const name = accomodation.name;
                        selectedReservations.push( 
                              <SingleReservationStyled onClickHandler={this.props.openModal} type={'checkIn'} key={index} name={name} index={index} start={accomodation.timeOfCheckIn}  timelineStart={this.props.timelineStart}/>
                        )
                }
            }
            if(this.isValidDate(dateTo) && this.isValidDate(this.props.date)){
              if(dateTo.toLocaleDateString()===this.props.date.toLocaleDateString()){
                      const name = accomodation.name;
                      selectedReservations.push( 
                            <SingleReservationStyled onClickHandler={this.props.openModal} type={'checkOut'} key={index} name={name} index={index} start={accomodation.timeOfCheckOut}  timelineStart={this.props.timelineStart}/>
                      )
              }
        }
        this.setState({
          selectedReservations
        })
    })
  }

  
  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  
 
    render(){
        return (
          <div className='events-wrapper'>
            {this.state.selectedEvents}
            {this.state.selectedReservations}
            </div>
        )
        
    }
}
export default Event