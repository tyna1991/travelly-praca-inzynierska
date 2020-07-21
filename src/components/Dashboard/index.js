import React from 'react';
import '../../App.css';
import Main from './Main'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter, Redirect } from 'react-router-dom'
import AddTrip from '../AddTrip/AddTrip';

class Dashboard extends React.Component{

    render(){
        return(
            <div>
            <Router>
            <Switch>
            <Route path="/home/add-trip"  >
                              <AddTrip  id={this.props.id} />
            </Route>
            <Route path="/home/edit-trip/:id" >
                           <AddTrip  id={this.props.id}/>
             </Route>
            <Route path="/home/edit-trip" >
                           <AddTrip  id={this.props.id}/>
             </Route>
             <Route path="/home/trip/:id/:menuSelect">
                           <Main  id={this.props.id} />
             </Route>
             <Route path="/home/trip" >
                           <Main  id={this.props.id}/>
             </Route>
             <Redirect from="/" to="/home/trip" />
             
            </Switch>
            </Router>
            </div>
        )
    }
}
export default withRouter(Dashboard);

