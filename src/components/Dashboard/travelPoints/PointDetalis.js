import React from 'react';
import '../../../App.css';



class PointDetalis extends React.Component{
    render(){ 
        const {point} = this.props
        return(
            <ul > 
                {this.props.pointName==='destinations' && 
                
                          <div className='point-informations'>
                         {point.address &&  <li>Adres : 
                         {point.address}
                       </li>}
                        <ul>
                        {point.openingHours.length ? <span>Godziny otwarcia: </span> : ''}
                        {point.openingHours.length ? point.openingHours.map(day=>
                           {return <li>{day}</li>}) : ''}
                        </ul>
                        {point.timeOfVisit &&  <li>Czas zwiedzania:
                            {point.timeOfVisit}
                        </li>}
                        {point.mainInformations &&  <li>Dodatkowe informacje:
                            {point.mainInformations}
                        </li>}
                        {point.costs && <li>Koszt:
                            {point.costs}
                        </li>}
                        <li>
                            {point.isOpen}
                        </li>
                        </div>
            
            }
            {this.props.pointName==='accomodations' && 
                          <div className='point-informations'>
                               {point.dateSinceAccomodation &&  <li>Od:
                            {point.dateSinceAccomodation}
                        </li>}
                        {point.dateToAccomodation &&  <li>Do:
                            {point.dateToAccomodation}
                        </li>}
                         {point.address &&  <li>Adres : 
                         {point.address}
                       </li>}
                        <ul>
                        {point.openingHours.length ? <span>Godziny otwarcia: </span> : ''}
                        {point.openingHours.length ? point.openingHours.map(day=>
                           {return <li>{day}</li>}) : ''}
                        </ul>
                        {point.timeOfVisit &&  <li>Czas zwiedzania:
                            {point.timeOfVisit}
                        </li>}
                        {point.telephone &&  <li>Dodatkowe informacje:
                            {point.telephone}
                        </li>}
                        {point.nrOfReservation && <li>Nr rezerwacji:
                            {point.nrOfReservation}
                        </li>}
                        {point.timeOfCheckIn && <li>Czas zameldowania:
                            {point.timeOfCheckIn}
                        </li>}
                        {point.timeOfCheckOut && <li>Czas wymeldowania:
                            {point.timeOfCheckOut}
                        </li>}
                        {point.amenities && <li>Udogodnienia:
                            {point.amenities}
                        </li>}
                        {point.notes && <li>Uwagi:
                            {point.notes}
                        </li>}
                        
                        <li>
                            {point.isOpen}
                        </li>
                       
                        </div>

            }
                  
            </ul>
        )
    }

}
  export default PointDetalis

