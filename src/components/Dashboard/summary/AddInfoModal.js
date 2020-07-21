import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class AddInfoModal extends React.Component{
  render(){

      
        return(
            <div className="modal show-event-modal" id="myModal">
                <div className="modal-content" id="scrollbar-custom">
                <button className="close" name="showEvents" onClick={()=>this.props.addInformationsClickHandler()}><FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/></button>
            <h3 className="title">Dodaj infomacje</h3>
            <form className="add-info">
            <textarea name='newMainInfo' value={this.props.newMainInfo} onChange={(e)=>this.props.onChangeHandler(e)}/>
            </form>
            <div className='center-button-div'>
            <button className="action-button light" onClick={()=>this.props.saveInfo(this.props.index)}>Zapisz</button>
            </div>
            </div>
            </div>

        )
    }
}
export default(AddInfoModal);