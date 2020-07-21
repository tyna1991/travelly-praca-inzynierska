import React from 'react';

class Trip extends React.Component{
render(){
    return(
        <div>
        <div className="add-trip-1-1 main-informations">
        <div className="input">
            <div className="input-wrapper">
                <div className="validation icon-input">
                <span className="main-category"></span>
                <div className="main-category-input">
                    <div>
                <label>Nazwa podróży: </label></div>
                
                <input className="trip" name="tripName" value={this.props.tripName} onChange={this.props.changeHandler}></input>
               
                </div>
                
             </div>
             <div className={this.props.validationTripNameIsInvalid ? 'error-block' : ''}>
                         {this.props.validationTripNameMessage}
                     </div>
            </div>
            </div>
            <div className="input">
            <div className="validation input-wrapper icon-input date">
            <span className="main-category date"></span>
                <div className="date-select">
                    <div>
                    <label>Od</label>
                    <input className="trip" type="date" name="dateSince" value={this.props.dateSince} onChange={this.props.changeHandler}/>         
                </div>
                    <div>
                    <label>Do</label>
                    <input className="trip" type="date" name="dateTo" value={this.props.dateTo} onChange={this.props.changeHandler}/>
                    </div>
                 
            </div> 
            
                    </div>
                    <div className={this.props.validationDateSinceIsInvalid ? 'error-block' : ''}>
                         {this.props.validationDateSinceMessage}
                     </div>
                     <div className={this.props.validationDateToIsInvalid ? 'error-block' : ''}>
                         {this.props.validationDateToMessage}
                     </div>

            </div>
           
        </div>
        </div>

    )
}
}


export default (Trip);