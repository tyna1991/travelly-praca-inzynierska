import React from 'react';
import FormErrors from './../../FormErrors';


class EditEvent extends React.Component{
  color=[];
    render(){
        const inValidCheck = this.props.validationTime.length && this.props.validationTime.filter(elem=>elem.index===this.props.index).length ? this.props.validationTime.filter(elem=>elem.index===this.props.index)[0] : ''
        const error = inValidCheck ? inValidCheck.isInvalid : '';
        const message  = error ? inValidCheck.message : ''
        return(
            <div>
           <div className="validation input-wrapper">
           
           <div className="modal-event--flex edit">
           <div><h4><span className="event-name">Nazwa: </span>{this.props.destination.name}</h4>
           <div className="input">
               <label>Wybierz kolor: </label>
           <input name="color" type="color" value={this.props.event.color} onChange={this.props.changeHandler(this.props.index)} className="color"/>
           </div>
           </div> 

            <div className="add-event-detalis" style={{backgroundColor:this.props.event.color}}>
               <div className="date-select">
                   <div>
                   <label>Dzień</label>
                   <input type="date" name="date" value={this.props.event.date} onChange={this.props.changeHandler(this.props.index)} min={this.props.dateSince} max={this.props.dateTo}/> 
                   {(this.props.submitted && !this.props.event.date && this.props.event.since && this.props.event.to)  && <div className="error-block">Podaj dzień</div>}
               </div>
                <div className="modal-event--flex date-modal">
               <div>
                   <label>Od</label>
                   <input type="time" name="since" value={this.props.event.since} onChange={this.props.changeHandler(this.props.index)}/>         
               </div>
               <div>
                   <label>Do</label>
                   <input type="time" name="to" value={this.props.event.to} onChange={this.props.changeHandler(this.props.index)}/>         
               </div>
               </div>
                   </div>
               {(this.props.submitted && this.props.event.hoursValid===false) && <FormErrors formErrors={this.props.formErrors} />}
               <div className={error && 'error-block'}>
                         {(this.props.submitted) && message}
                     </div>
               

</div>
           </div>
      </div>     
           </div>
        )
    }
}
export default EditEvent