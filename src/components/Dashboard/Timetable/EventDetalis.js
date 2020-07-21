import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class EventDetalis extends React.Component{
 event;
  renderModal(){
     if (this.props.selectedEvent !== null) {
        this.event = this.props.events[this.props.selectedEvent];
        return (
            <div className='date'>
            <span>data: </span><h3>{this.event.date}</h3>
            <span>czas wydarzenia: </span><h3>{this.event.since} - {this.event.to}</h3>
          </div>
        );
      }
    }

    render(){
        return (
            <div className="modal show-event-modal" id="myModal" style={{display:this.props.showEventDetalis ? 'block' : 'none'}}>
            <div className="modal-content" id="scrollbar-custom">
            <button className="close" name="showEvents" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
        <h3 className="title">Szczegóły</h3>
        <div className='modal-event--flex'>
        {this.renderModal()}
        {this.props.destinations.map((destination, index)=>(
         destination.id===this.event.destination && 
         <div className='modal-show-event-detalis'>
            <p>Nazwa: <b>{destination.name}</b></p>
            {destination.address && <p>Adres: {destination.address}</p>}
            {destination.mainInformations && <p>Ważne informacje: {destination.mainInformations}</p>}
            {destination.openingHours && <p><span>Godziny otwarcia:</span> {
              destination.openingHours.map(element=>(
                <p className='opening-hours-by-day'>{element}</p>
              ))
            }</p>}
            {destination.timeOfVisit && <p>Czas wizyty: {destination.timeOfVisit}</p>}
        </div>
        )) }
        </div>
        </div>
        </div>
        )
        
    }
}
export default EventDetalis