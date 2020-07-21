import React from 'react';
import '../../App.css';
import logo from '../../assets/travelly-logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBell } from '@fortawesome/free-solid-svg-icons'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
import { userActions } from './../../_actions/user.actions';
import { connect } from 'react-redux';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import {history} from './../../_helpers/history'

class Header extends React.Component{
  componentDidMount(){
    this.props.getLogin();
  }
  toDashboard(){
    history.replace({
      pathname:'/home/trip/dashboard',
      state:''
    })
  }
    render(){
        const {login } = this.props;
        return(
            <div >
            <nav>
              <div className="navigation-logged-in">
                <div className="container">
                <div className="brand"><span onClick={this.toDashboard}><img src={logo} alt="logo"/></span></div>
                <div className="navigation-action">
                  <span>Witaj, <b>{login}</b></span>
                  {/* <div className="nav-buttons">
                    <div><FontAwesomeIcon icon={faBell} size="2x" color="#000" /><span className="circle-info">5</span></div>
                    <div><FontAwesomeIcon icon={faUser} size="2x" color="#000" /><span className="circle-info">v</span></div>
                  </div> */}
                  <div className="sign-out">
                    <button onClick={()=>{this.props.logout()}} className="action-button">Wyloguj</button>
                  </div>
                </div>
              </div>
              </div>
            </nav>
           

          </div>
        )
    }
}
function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { login } = users;
    return { user, users, login };
}

const actionCreators = {
    logout: userActions.logout,
    deleteUser: userActions.delete,
    getLogin: userActions.getLogin
}

export default withRouter(connect(mapState, actionCreators)(Header));