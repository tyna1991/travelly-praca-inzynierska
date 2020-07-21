import React from 'react';
import '../../App.css';
import { userActions } from './../../_actions/user.actions';
import { tripActions } from './../../_actions/trip.actions';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import { history } from '../../_helpers/history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'



class Main extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<div></div>)

    }
}

export default Main