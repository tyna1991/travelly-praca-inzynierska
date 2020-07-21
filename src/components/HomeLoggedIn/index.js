import React from 'react';
import '../../App.css';
import Header from './Header'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Dashboard from './../Dashboard';
import {history} from './../../_helpers/history'
import Footer from '../HomePage/Footer';


class HomeLoggedIn extends React.Component{
    location='';    
    constructor(){
            super();
            this.state={
                location:'',
                id:undefined,
                    
            }
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            history.listen((location, action) => {
              this.setState({
                id:location.state,
              })
          });
           }
        componentDidMount(){
            this.location = this.props.location.pathname;
            this.location = this.location.substring(this.location.lastIndexOf('/') + 1);
            this.location = this.location.match(/[0-9]+/) ? this.location : '';
            this.setState({
                location:this.location
            })
        }
        
    render(){
        return(
            <div className="main-page-logged-in">
            <Header/>
            <Router >
            <main>
                <div className="trips-info ">
                    <Route path="/home" render={(props) => (<Dashboard {...props} id={this.state.id} key={this.props.location.key} />)}></Route>
          </div>
          </main>
          <Footer/>
          </Router> 
            
            </div>
          
        )
    }
}
export default withRouter(HomeLoggedIn);