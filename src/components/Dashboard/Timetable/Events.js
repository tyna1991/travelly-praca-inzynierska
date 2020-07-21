import React from 'react';
import Event from './Event'

class Events extends React.Component{

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

    render(){
        let dateSince = new Date(this.props.selectedTrip.trip.dateSince);
        let dateTo = new Date(this.props.selectedTrip.trip.dateTo);
        let daysCount = parseInt(Math.abs(dateSince-dateTo) / (1000*60*60*24))
        let dateEventsArray=[];
        if(this.isValidDate(dateSince)){
          dateEventsArray.push(dateSince);
          for (let i=1;i<=daysCount; i++){
            let newDate=new Date(dateSince);
            newDate.setDate(dateSince.getDate() + i);
            dateEventsArray.push(new Date(newDate));
        }
        }
        let dateLi = dateEventsArray.map((date)=>{
            return (<li key={date} className="day-group">
                 <div className="day-name"><span>{date.toLocaleDateString()}</span><span className="locale-name">{date.toLocaleDateString("pl-PL", { weekday: 'long' })}</span></div>
                 <ol>
                    <li className="event">
                        <Event openModal={this.props.openModal} destinations={this.props.selectedTrip.destinations} accomodations={this.props.selectedTrip.accomodations} key = {date} events={this.props.selectedTrip.events} date={date} timelineStart={this.props.start} timelineEnd={this.props.end}/>
                    </li>
                 </ol>
                 </li>)
        })
        return(
        
            <div className="events slider-element">
                <div className="events-container">
                <ul style={{height:((this.props.rowsCount)*50)+50+'px'}}>
                    {dateLi}
                </ul>
                </div>
            </div>
        )
    }
}
export default Events