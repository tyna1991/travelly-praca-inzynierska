import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class ReservationDetalis extends React.Component{
 reservation;
  renderModal(){
     if (this.props.selectedReservation !== null) {
        this.reservation = this.props.accomodations[this.props.selectedReservation];
        return (
            <div className='date'>
            <span>Od : </span><h3>{this.reservation.dateSinceAccomodation}</h3>
            <span>Do : </span><h3>{this.reservation.dateToAccomodation}</h3>
            <span>czas zameldowania: </span><h3>{this.reservation.timeOfCheckIn}</h3>
            <span>czas wymeldowania: </span><h3>{this.reservation.timeOfCheckOut}</h3>
            
          </div>
        );
      }
    }

    render(){
        return (
            <div className="modal show-event-modal" id="myModal" style={{display:this.props.showDetalis ? 'block' : 'none'}}>
            <div className="modal-content" id="scrollbar-custom">
            <button className="close" name="showEvents" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
        <h3 className="title">Szczegóły</h3>
        <div className='modal-event--flex'>
        {this.renderModal()}
        <div className='modal-show-event-detalis'>
            <p>Nazwa: <b>{this.reservation.name}</b></p>
            {this.reservation.address && <p>Adres: {this.reservation.address}</p>}
            {this.reservation.openingHours && <p><span>Godziny otwarcia:</span> {
              this.reservation.openingHours.map(element=>(
                <p className='opening-hours-by-day'>{element}</p>
              ))
            }</p>}
            {this.reservation.telephone && <p>Telefon: {this.reservation.telephone}</p>}
            {this.reservation.amenities && <p>Udogodnienia: {this.reservation.amenities}</p>}
            {this.reservation.notes && <p>Uwagi: {this.reservation.notes}</p>}
            
        </div>
        </div>
        </div>
        </div>
        )
        
    }
}
export default ReservationDetalis