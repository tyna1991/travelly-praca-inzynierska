import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
function Warning(props){
          return(
              <div className="modal warning" id="myModal">
                  <div className="modal-content" id="scrollbar-custom">
                  <button className="close" name="showEvents" onClick={()=>props.closeWarning()}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
              <h3 className="title">Ostrzeżenie</h3>
             <p>{props.message} Zmiany dotyczące punktu nie zostaną zapisane. Kontynuować? </p>
              <div className='center-button-div'>
              <button className="action-button" onClick={()=>props.closeWarning()}>Nie</button>
              <button className="action-button" onClick={()=>props.postData()}>Tak</button>
              </div>
              </div>
              </div>
          )
  }
  export default(Warning);