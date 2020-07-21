import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { setAccessToken } from '../_helpers/accessToken';

class PrivateRoute extends React.Component{
    state = {
        loading: true,
        isAuthenticated: false,
      }
      componentDidMount(){
        fetch("/refresh_token", {
        method: "POST",
        credentials: "include"
        }).then(async x =>{
        const data = await x.json();
        if(data.ok){
            setAccessToken(data.accessToken);
            this.setState({
                loading: false,
                isAuthenticated:true,
            });}else{
                this.setState({
                    loading: false,
                })
            }
       });
    }
    
    render(){
        const { component: Component, ...rest } = this.props;
        if (this.state.loading) {
            return <div><Preloader/> </div>;
          } else {
        return <Route {...rest} render={props => (
            this.state.isAuthenticated ? <Component {...props} />
           : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
         )} />
        }
    }
}

export default PrivateRoute