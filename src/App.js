import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/index';
import HomeLoggedIn from './components/HomeLoggedIn/index';
import  PrivateRoute from './_components/PrivateRoute';
import { history } from './_helpers/history';

class App extends React.Component {
  render()
  {
    return (
    <div className="App">
      <Router history={history}>
                            <Switch>
                                <Route exact path="/" component={(HomePage)} />
                                <PrivateRoute path="/" component={(HomeLoggedIn)}/>
                                <Route exact path="*" component={(HomePage)} />
                            </Switch>
      </Router>
    </div>
  );
}
}

export default App;
