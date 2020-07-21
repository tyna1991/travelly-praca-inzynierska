import React from 'react';
import '../../App.css';
import { tripActions } from './../../_actions/trip.actions';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'



class SelectTripBar extends React.Component{
    constructor(props){
        super(props)
            this.state={
                changeTrip:'',
            }
            this.changeHandler=this.changeHandler.bind(this);   
            this.removeTrip=this.removeTrip.bind(this)
    }
    componentDidMount() {
        this.props.getTripsIds();
    }
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id || prevProps.trips !== this.props.trips){
        const id = (this.props.id !=undefined) ? this.props.id : (this.props.matchId) ? this.props.matchId : '';
        if(id){
            this.props.trips.forEach((tripObject)=>{
                if (tripObject.id===id){
                    this.setState({
                        ...this.state,
                        changeTrip:tripObject.tripName
                    })
                 }
                })
        }
        else{
            if(this.props.trips.length){
                this.setState({
                    ...this.state,
                    changeTrip:this.props.trips[this.props.trips.length-1].tripName
                })
            }   
        }
        }
    }
    removeTrip(){
        this.props.removeTrip(this.props.data.trip.id);
        this.props.getTripsIds();
        this.props.getDashboardTrip()
    }
    changeHandler(e){
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index]
        let optionId =  optionElement.getAttribute('id');
        this.props.getTripById(optionId);
    }
    render(){
        return(
                <div className="container">
                <div className="trip-navigation container">
                     {this.props.trips.length ? <div className="select-trip">
                         <label>Wybierz podróż: </label>
                         <select name="changeTrip" value={this.state.changeTrip} onChange={this.changeHandler}>
                         {this.props.trips.map((tripObject, index)=>{
                             return <option key={index} id={tripObject.id}>{tripObject.tripName}
                         </option>
                        })}
                         </select>
                         </div> : <div></div>}
                         <div className="trip-buttons">
                         {this.props.trips.length ? <div className="modify-trip">
                         <span className="action-button">Więcej<span><FontAwesomeIcon icon={faChevronDown} size="1x" color="#000"/></span></span>
                      <div>
                      {this.props.id ? <Link  to={`/home/edit-trip/${this.props.id}`}>Edytuj podróż</Link> 
                        : this.props.match.params.id ?  <Link  to={`/home/edit-trip/${this.props.match.params.id}`}>Edytuj podróż</Link> 
                        : <Link  to="/home/edit-trip">Edytuj podróż</Link>}
                      <button onClick={this.removeTrip} to="/dashboard">Usuń podróż</button>
                      </div>
                      </div> : <div></div>}
                      <Link to="/home/add-trip" className="action-button white">Dodaj podróż</Link>
                      </div>
            </div>       
          </div>
        )

    }
}

function mapState(state) {
    const { users, authentication, getTrips, getTrip } = state;
    const { user } = authentication;
    const { trips, loading } = getTrips;
    const { data} = getTrip;
    return { user, users, trips, loading, data};
}

const actionCreators = {
    getTripsIds:tripActions.getAll,
    getTripById:tripActions.getById,
    removeTrip:tripActions.deleteTrip,
    getDashboardTrip:tripActions.getDashboardTrip
}


export default withRouter(connect(mapState, actionCreators)(SelectTripBar));