import React from 'react';
import EditEvent from './EditEvent';


class Destination extends React.Component{
    render(){
        return(
            <div>
                <div className="input-wrapper">
                <div><h4><span className="event-name">Państwo: </span>{this.props.country[0].name}</h4></div> 
                    {this.props.destinations.length ? this.props.destinations.map((destination) => (
                        this.props.events.map((event, index)=>(
                            event.destination===destination.id )&& (<EditEvent validationTime={this.props.validationTime} destination={destination} event={event} changeHandler={this.props.changeHandler} index={index} key={index} dateSince={this.props.dateSince} dateTo={this.props.dateTo} formErrors={this.props.formErrors} submitted={this.props.submitted}/> )
                        ))
                    ) : 
                    <p>brak wydarzeń</p>} 

                   {/* {this.props.events.map((event, index) => (
                        event.idDestination===this.props.destination.id &&
                         (<EditEvent event={event} changeHandler={this.props.changeHandler} index={index} dateSince={this.props.dateSince} dateTo={this.props.dateTo} formErrors={this.props.formErrors} submitted={this.props.submitted}/> )
                    ))}  */}

           </div>
           </div>
        )
    }
}
export default Destination