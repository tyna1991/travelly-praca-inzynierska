import React from 'react';
import '../../App.css';
import Main from './Main';
import Header from './Header';
import { connect } from 'react-redux';

import { history } from '../../_helpers/history';
import { alertActions } from '../../_actions/alert.actions';
import Footer from './Footer';

class HomePage extends React.Component{
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }
    render(){
        const { alert, isLogginFailure, isRegistrationSuccess } = this.props;
        return(
            <div>
            <div className="alert-message">
            {((alert.message && isLogginFailure) &&
                           <div className={`alert ${alert.type}`}>{alert.message}</div>)
                        || ((alert.message && isRegistrationSuccess) &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>)
                        }
                
            </div>
            <Header/>
            <Main/>
            <Footer/>
            </div>
        )
    }
}
function mapState(state) {
    const { alert } = state;
    const { isLogginFailure } = state.authentication
    const { isRegistrationSuccess } = state.registration
    return { alert, isLogginFailure, isRegistrationSuccess };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(HomePage)