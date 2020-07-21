import React from 'react';
import '../../App.css';
import logo from '../../assets/travelly-logo.png';
import { connect } from 'react-redux';
import { userActions } from './../../_actions/user.actions';
import FormValidator from './../FormValidator/FormValidator';
import loginValidation from './../validations/loginValidation'
import emailValidation from './../validations/emailValidation'
import passwordValidation from './../validations/passwordValidation'
import passwordCompare from './../validations/passwordCompare'
import isEmpty from './../validations/isEmpty'
import SignUpModal from './SignUpModal'


class Header extends React.Component{
    constructor(props){
        super(props)
        this.validator = new FormValidator([
            { 
                field: 'registerPassword',
                method: isEmpty, 
                stateName:['user'],
                validWhen: true, 
                message: 'Pole hasło nie może być puste' 
              },
              { 
                field: 'registerLogin',
                method: isEmpty, 
                stateName:['user'],
                validWhen: true, 
                message: 'Pole login nie może być puste' 
              },
              { 
                field: 'registerEmail',
                method: isEmpty, 
                stateName:['user'],
                validWhen: true, 
                message: 'Pole e-mail nie może być puste' 
              },
            {
                field: 'registerPassword',
                method: passwordValidation, 
                stateName:['user'],
                validWhen: true, 
                message: 'Hasło musi mieć conajmniej 5 znaków, zawierać jedną dużą literę oraz cyfrę' 
              },
            {   
                field: 'registerConfirmPassword',
                method: passwordCompare, 
                stateName:['user'],
                args:['registerPassword'],
                validWhen: true,
                message: 'Podane hasła nie jest zgodne' 
              },
              { 
                field: 'registerLogin',
                method: loginValidation, 
                stateName:['user'],
                validWhen: true, 
                message: 'Login musi zawierać co najmniej 3 znaki' 
              },
            {
              field: 'registerEmail',
              method: emailValidation, 
              stateName:['user'],
              validWhen: true, 
              message: 'Podaj poprawny e-mail' 
            },
            ])
        //this.props.logout();
        this.state={
            signUpBool:false,
            loginUsername:'',
            loginPassword:'',
            submittedLogin:false,
            user: {
                registerLogin: '',
                registerPassword: '',
                registerConfirmPassword:'',
                registerEmail: '',
            },
            submittedRegistration: false,
            validation: this.validator.valid(),
        }
        this.signUpModal=this.signUpModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearData = this.clearData.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.isRegistrationSuccess !== prevProps.isRegistrationSuccess) {
            if(this.props.isRegistrationSuccess){
                this.clearData();
            }
        }
      }
    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        name==="loginPassword" || name==="loginUsername" ? this.setState({ [name]: value }) : this.setState({
            user: {
                ...user,
                [name]: value
            }
        });

    }
    handleSubmit(e) {
        e.preventDefault();
        const user = this.state.user;
        let arg={user}
        const validation = this.validator.validate(arg);
       if (e.target.classList.contains("register-button")){
            this.setState({ ...this.state, validation, submittedRegistration: true });
       }else{
        this.setState({ submittedLogin: true });
       }
        const { loginUsername, loginPassword } = this.state;
        if (loginUsername && loginPassword) {
            if((e.target.classList.contains("log-in-button"))){
                this.props.login({login:loginUsername, password:loginPassword});
            }  
        }
         
    if(validation.isValid){
        if (user.registerLogin && user.registerPassword && user.registerEmail) {
            if((e.target.classList.contains("register-button"))){
                this.props.register({login:user.registerLogin, password:user.registerPassword, email:user.registerEmail}); 
            } 
         }
    }   
    }
    clearData(){
        this.setState({
        submittedRegistration:false,
        user: {
            registerLogin:'',
            registerPassword:'',
            registerConfirmPassword:'',
            registerEmail:''}
        })
         this.signUpModal();   
 }
    signUpModal(){
        this.setState(prevState=>{
            return {
                signUpBool:!prevState.signUpBool
            }
        })
    } 
    render(){
        const user = this.state.user;
        let arg={user}
        let validation = this.state.submittedRegistration ?                   
                    this.validator.validate(arg):  
                      this.state.validation 
        const { alert, isRegistrationError } = this.props;
        const { loginUsername, loginPassword, submittedLogin, submittedRegistration, } = this.state;
        return(
            <div className="register">
            {this.state.signUpBool && <SignUpModal signUpModal={this.signUpModal} 
            isRegistrationError={isRegistrationError} alert={alert} user={this.state.user} submittedRegistration={submittedRegistration}
            handleChange={this.handleChange} handleSubmit={this.handleSubmit} validation={validation}
            />
            }
            <div className="container">
            <nav>
              <div className="navigation">
                <div className="brand"><img src={logo} alt="logo"/>
                </div>
                <div className="log-in-sign-in">
                  <form>
                  <div className="log-in"><span>Zaloguj się:</span>
                    <div className="input">
                      <label>login</label>
                      <input  name="loginUsername" value={loginUsername} onChange={this.handleChange}/>
                      {submittedLogin && !loginUsername &&
                            <div className="error-block">Login jest wymagany</div>
                        }
                    </div>
                    <div className="input">
                      <label>hasło</label>
                      <input type="password" name="loginPassword" value={loginPassword} onChange={this.handleChange}/>
                      {submittedLogin && !loginPassword &&
                            <div className="error-block">Hasło jest wymagane</div>
                        }
                    </div>
                    <button onClick={this.handleSubmit} className="action-button log-in-button">Zaloguj się</button>
                  </div>
                  </form>
                  <div className="sign-in"><span>Zarejestruj się:</span>
                    <button className="action-button" onClick={this.signUpModal}>Zarejestruj się</button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          </div>
        )

    }
}
function mapState(state) {
    const { loggingIn } = state.authentication;
    const { registering, isRegistrationError, isRegistrationSuccess } = state.registration;
    const { alert } = state;
    return { loggingIn, registering, alert, isRegistrationError, isRegistrationSuccess };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
    register: userActions.register
};

export default connect(mapState, actionCreators)(Header);
// export default Header