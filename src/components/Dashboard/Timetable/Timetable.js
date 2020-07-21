import React from 'react';
import Timeline from './Timeline';
import Events from './Events';
import ShowEvents from './ShowEvents';
import AddEvents from './AddEvents';
import { connect } from 'react-redux';
import { tripActions } from './../../../_actions/trip.actions';
import EventDetalis from './EventDetalis';
import { withRouter } from 'react-router-dom';
import Preloader from '../../Preloader';
import ReservationDetalis from './ReservationDetalis';
import LeftArrow from './../slider/LeftArrow';
import RightArrow from './../slider/RightArrow';


class Timetable extends React.PureComponent{
    constructor(props){
    super(props)
    this.state={
      currentIndex:0,
      howManyDays:[],
      hasOverflow :false,
      canScrollLeft:false,
      canScrollRight: false,
      scrollLeft:false,
      showEventsModal:false,
      addEventsModal:false,
      showEventDetalis:false,
      showReservationsDetalis:false,
      selectedEvent:null,
      selectedReservation:null,
      timelineStart:'9:00',
      timelineEnd:'22:00',
      rowsCount:15,
      offsetWidth:0
    }
    this.keyCount = 0;
    this.modalAddEventsChange=this.modalAddEventsChange.bind(this)
    this.modalShowEventsChange=this.modalShowEventsChange.bind(this)
    this.modalShowEventDetalis=this.modalShowEventDetalis.bind(this)
    this.modalCloseEventDetalis=this.modalCloseEventDetalis.bind(this)
    this.howManyDays=this.howManyDays.bind(this)

    this.checkForOverflow = this.checkForOverflow.bind(this)
    this.checkForScrollPosition = this.checkForScrollPosition.bind(this)
    this.scrollContainerBy = this.scrollContainerBy.bind(this)
    this.checkWidth = this.checkWidth.bind(this)
    this.getKey = this.getKey.bind(this);
  

    this.container = React.createRef()
  }
  getKey(){
    return this.keyCount++;
}
  scrollContainerBy(distance) {
    this.container.current.scrollBy({ left: distance, behavior: 'smooth' })
  }
  componentDidMount(){
    // if(this.props.data.trip.dateSince){
    //   this.renderSections();
    // }
    this.checkForScrollPosition();
    this.container.current.addEventListener(
      'scroll', this.checkForScrollPosition
      )
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
    this.props.getTimetableTrip(this.props.match.params.id);
    this.props.getEvents(this.props.match.params.id);
    this.howManyDays()
  }
  componentWillUnmount() {
    this.container.current.removeEventListener(
      'scroll',
      this.checkForScrollPosition
    )
    window.removeEventListener(
      'resize',
      this.checkWidth
    )
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.data !== prevProps.data) {
      this.howManyDays()
      this.checkForOverflow();
      if(prevProps.data.events!==this.props.data.events || prevProps.data.accomodations!==this.props.data.accomodations){
        const since=this.props.data.events.map(event=>{
            const eventArray = event.since.split(':');
            if(eventArray[0]){
              return eventArray[0]
            }else{
              return -1
            }
      }).concat(this.props.data.accomodations.map(item=>{
        const eventArray = item.timeOfCheckIn.split(':');
            if(eventArray[0]){
              return eventArray[0]
            }else{
              return -1
            }
      })).filter(element=>{return element>-1})

      const to=this.props.data.events.map(event=>{
      const eventArray = event.to.split(':');
      if(eventArray[0]){
            return eventArray[0]
      }else{
            return -1
      }
    }).concat(this.props.data.accomodations.map(item=>{
      const eventArray = item.timeOfCheckOut.split(':');
          if(eventArray[0]){
            return eventArray[0]
          }else{
            return -1
          }
    })).filter(element=>{return element>-1})
      const minSince = since.length ? Math.min(...since)-1 : '';
      let maxTo = to.length ? Math.max(...to)+1 : '';
      let changeSince=false;
          let changeTo=false;
          let changeToDefault=false;
          if(minSince!==''){
            if(prevState.timelineStart.split(":")[0]>minSince || (prevState.timelineStart.split(":")[0]<minSince && prevState.timelineStart.split(":")[0]<9)){
              changeSince=true
            }
          }
          if(maxTo!==''){
            if(prevState.timelineEnd.split(':')[0]<maxTo){
              changeTo=true
            }
            if((prevState.timelineEnd.split(":")[0]>maxTo && prevState.timelineEnd.split(":")[0]>22)){
              changeToDefault=true
            }
          }   
        if(changeToDefault){
          changeTo = true;
          maxTo=22;
        }
      if(changeSince || changeTo){
        this.setState(prevState=>{
          const rowsCount = (((changeTo) ? maxTo : this.state.timelineEnd.split(':')[0])-(changeSince ? minSince : this.state.timelineStart.split(':')[0]))+2
          return {
            ...this.state,
            timelineStart:changeSince ? (minSince)+':00' : prevState.timelineStart,
            timelineEnd:changeTo ? (maxTo)+':00' : prevState.timelineEnd,
            rowsCount:rowsCount
          }})
      }
      
     }
   }
      
  }
  howManyDays(){
    const daysCount =  parseInt(Math.abs(new Date(this.props.data.trip.dateSince)-new Date(this.props.data.trip.dateTo)) / (1000*60*60*24));
    this.setState({
      howManyDays:daysCount
    })
  }
  checkWidth(){
    const {offsetWidth} = this.container.current
    this.setState({
      offsetWidth: offsetWidth
    })
    this.checkForOverflow();
  }


  checkForOverflow() {
    const { scrollWidth, clientWidth } = this.container.current
    const hasOverflow = scrollWidth > clientWidth
    this.setState({ hasOverflow })
  }
  checkForScrollPosition() {
    const { scrollLeft, scrollWidth, clientWidth} = this.container.current
    this.setState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft !== scrollWidth - clientWidth || scrollLeft===0
    })
  }
    modalShowEventsChange(){
        this.setState((prevState)=>{
          return {showEventsModal:!prevState.showEventsModal}
        })
      }  
      modalShowEventDetalis(index, name){
        if(name==='event'){
          this.setState({
            showEventDetalis:true,
            selectedEvent:index 
        })
      }
        if(name==='reservation'){
          this.setState({
            showReservationsDetalis:true,
            selectedReservation:index 
        })
        }
      }
        
      modalCloseEventDetalis(){
        this.setState({
            showEventDetalis:false,
            showReservationsDetalis:false,
            selectedEvent:null,
            selectedReservation:null 
        })
      }      
    modalAddEventsChange(){
      this.setState((prevState)=>{
        return {
          addEventsModal:!prevState.addEventsModal,
          showEventsModal : prevState.showEventsModal && false
        }
      })
    }
    render(){
    const {currentIndex, howManyDays} = this.state  
        return(
          <div className="timetable-main main-1-dashboard">
           {this.props.loading && <Preloader/>}
                    <div className="dashboard-container">
                      <div>
                        <div className="trip-buttons">
                          <div>
                          <button className="action-button light" name="showEvents" onClick={this.modalShowEventsChange}>Zobacz swoje wydarzenia</button>
                          <button className="action-button light" name="addEvents" onClick={this.modalAddEventsChange}>Dodaj nowe wydarzenia</button>
                          </div>                       
                        <div className="nav-arrows-wrapper" style={{display:!this.state.hasOverflow && 'none'}}>
                      <LeftArrow prevSlide={this.scrollContainerBy} hideElement={!this.state.canScrollLeft} scrollParam = {-this.state.offsetWidth}/>
                      <RightArrow nextSlide={this.scrollContainerBy} hideElement={!this.state.canScrollRight} scrollParam = {this.state.offsetWidth}/>
                      </div>
                        </div>
                      {this.state.showEventsModal &&  
                      <ShowEvents selectedTrip={this.props.data} 
                      closeModal={this.modalShowEventsChange} changeModal={this.state.showEventsModal} tripId={this.props.data.trip.id} modalAddEventsChange={this.modalAddEventsChange}/>}
                      {this.state.addEventsModal &&  
                      <AddEvents selectedTrip={this.props.data} 
                      closeModal={this.modalAddEventsChange} changeModal={this.state.addEventsModal} tripId={this.props.data.trip.id}/>}
                      
                      {this.state.showEventDetalis &&
                      <EventDetalis showEventDetalis={this.state.showEventDetalis} events={this.props.data.events} destinations={this.props.data.destinations} selectedEvent={this.state.selectedEvent} closeModal={this.modalCloseEventDetalis}/>}
                      {this.state.showReservationsDetalis &&
                      <ReservationDetalis showDetalis={this.state.showReservationsDetalis} accomodations={this.props.data.accomodations} selectedReservation={this.state.selectedReservation} closeModal={this.modalCloseEventDetalis}/> }
                      <Timeline currentIndex={currentIndex} howManyDays={howManyDays} 
                      start={this.state.timelineStart} end={this.state.timelineEnd}/>
                      <div className="timetable-info slider" id="scrollbar-custom" ref={this.container}> 
                      <div className="slider-wrapper">
                      <Events rowsCount={this.state.rowsCount} openModal={this.modalShowEventDetalis} selectedTrip={this.props.data}
                      start={this.state.timelineStart} end={this.state.timelineEnd}/>
                      </div>
            </div>

            
            </div>
            </div>
            </div>
        )
    }
}

function mapState(state) {
  const { data, loading } = state.getTrip;
  return { loading, data };
}

const actionCreators = {
  getTimetableTrip:tripActions.getTravelPointsTrip,
  getEvents:tripActions.getEvents
}

export default withRouter(connect(mapState, actionCreators)(Timetable));