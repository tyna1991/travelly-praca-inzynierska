import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function SignUpModal(props){
const { signUpModal, isRegistrationError, alert, user, handleChange, handleSubmit} = props;
return (
    <div id="myModal" className="modal">
                <div className="modal-content" id="scrollbar-custom">
                 <span className="close" onClick={signUpModal}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></span>
                 <h2>Zarejestruj się</h2>
                 <div className="sign-up">
                {isRegistrationError &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div> }
                    <div className="input">
                     <label>login</label>
                     <input name="registerLogin" value={user.registerLogin} onChange={handleChange}/>
                      <div className={props.validation.registerLogin.isInvalid ? 'error-block' : undefined}>
                         {props.validation.registerLogin.message}
                     </div>
                 </div>
                 <div className="input">
                 <label>hasło</label>
                <input type='password' name="registerPassword" value={user.registerPassword} onChange={handleChange}/>
                <div className={props.validation.registerPassword.isInvalid ? 'error-block' : undefined}>
                         {props.validation.registerPassword.message}
                </div>
                 </div>
                <div className="input">
                 <label>powtórz hasło</label>
                <input type='password' name="registerConfirmPassword" value={user.registerConfirmPassword} onChange={handleChange}/>
                </div>
                <div className={props.validation.registerConfirmPassword.isInvalid ? 'error-block' : undefined}>
                         {props.validation.registerConfirmPassword.message}
                </div>
                <div className="input">
                    <label>adres email</label>
                     <input name="registerEmail" value={user.registerEmail} onChange={handleChange}/>
                        <div className={props.validation.registerEmail.isInvalid ? 'error-block' : undefined}>
                         {props.validation.registerEmail.message}
                        </div>
                 </div>
                <div className="sign-up-button">
                     <button className="action-button register-button" onClick={handleSubmit}>Zarejestruj się</button>
                 </div>
             </div>
         </div>
         </div>
)
}

export default SignUpModal
