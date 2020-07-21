import React from 'react';
import '../../App.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, withRouter, Redirect } from "react-router-dom";
import LastTripsDetalis from './summary/LastTripDetalis';
import Timetable from './Timetable/Timetable';
import Checklist from './checklist/Checklist';
import TravelPoints from './travelPoints';
import SelectTripBar from './selectTripBar';
import Directions from '../Dashboard/Directions';
import PageNotFound from './../PageNotFound/PageNotFound'

class Main extends React.Component{
    render(){
        return(
            <main className="duo-color">
               <SelectTripBar id={this.props.id} matchId={this.props.match.params.id}/>
                <div id="background">
                <div className="current-trip-info container">
                    <ul className="current-trip-nav">
                        {this.props.id ? <li><NavLink to={`/home/trip/${this.props.id}/dashboard`}>Podsumowanie</NavLink></li> 
                        : this.props.match.params.id ?  <li><NavLink to={`/home/trip/${this.props.match.params.id}/dashboard/`}>Podsumowanie</NavLink></li> 
                        : <li><NavLink to="/home/trip/dashboard/">Podsumowanie</NavLink></li>}
                        {this.props.id ? <li><NavLink to={`/home/trip/${this.props.id}/timetable`}>Terminarz</NavLink></li> 
                        : this.props.match.params.id ?  <li><NavLink to={`/home/trip/${this.props.match.params.id}/timetable`}>Terminarz</NavLink></li> 
                        : <li><NavLink to="/home/trip/timetable">Terminarz</NavLink></li>}
                        {this.props.id ? <li><NavLink to={`/home/trip/${this.props.id}/directions`}>Trasa</NavLink></li> 
                        : this.props.match.params.id ?  <li><NavLink to={`/home/trip/${this.props.match.params.id}/directions`}>Trasa</NavLink></li> 
                        : <li><NavLink to="/home/trip/directions">Trasa</NavLink></li>}
                        {this.props.id ? <li><NavLink to={`/home/trip/${this.props.id}/checklist`}>Lista rzeczy</NavLink></li> 
                        : this.props.match.params.id ?  <li><NavLink to={`/home/trip/${this.props.match.params.id}/checklist`}>Lista rzeczy</NavLink></li> 
                        : <li><NavLink to="/home/trip/checklist">Lista rzeczy</NavLink></li>}
                        {this.props.id ? <li><NavLink to={`/home/trip/${this.props.id}/travel-points/`}>Punkty Podróży</NavLink></li> 
                        : this.props.match.params.id ?  <li><NavLink to={`/home/trip/${this.props.match.params.id}/travel-points`}>Punkty Podróży</NavLink></li> 
                        : <li><NavLink to="/home/trip/travel-points">Punkty Podróży</NavLink></li>}
                    </ul>
                    
                    <Switch>
                        
                        <Route path="/home/trip/:id/dashboard" >
                              <LastTripsDetalis id={this.props.id} />
                        </Route>
                        <Route path="/home/trip/dashboard/:sth" component={PageNotFound} />
                        <Route path="/home/trip/dashboard" >
                              <LastTripsDetalis id={this.props.id} />
                        </Route>
                        <Route path="/home/trip/:id/timetable" >
                           <Timetable id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/timetable/:sth" component={PageNotFound} />
                        <Route path="/home/trip/timetable" >
                           <Timetable id={this.props.id}/>
                        </Route>
                        
                        {/* <Route path="/add-event" >
                           <Timetable id={this.props.id}/>
                        </Route> */}
                       
                        <Route path="/home/trip/:id/checklist" >
                           <Checklist id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/timetable/:sth" component={PageNotFound} />
                        <Route path="/home/trip/checklist/:sth" component={PageNotFound} />
                        <Route path="/home/trip/checklist" >
                           <Checklist id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/:id/travel-points" >
                           <TravelPoints id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/travel-points/:sth" component={PageNotFound} />
                        <Route path="/home/trip/travel-points" >
                           <TravelPoints id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/:id/directions" >
                           <Directions id={this.props.id}/>
                        </Route>
                        <Route path="/home/trip/directions/:sth" component={PageNotFound} />
                        <Route path="/home/trip/directions" >
                           <Directions id={this.props.id}/>
                        </Route>
                        <Redirect from="/" to="/home/trip/dashboard" />
                    </Switch>
                   
                  </div>
                  </div>
           </main> 
             
        )

    }
}



export default withRouter(Main);