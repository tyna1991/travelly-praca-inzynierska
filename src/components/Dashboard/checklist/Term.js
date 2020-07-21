import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

function Term(props){
    return (
        <div>
        <label>
        <input className="term" disabled={props.disabled} value={props.term} onClick={()=>{props.onClick(props.index)}} onChange={props.onChange(props.index)} placeholder="wpisz rzecz" />
        </label>
        {props.index!==props.termsLength-1 &&  <span onClick={()=>{props.deleteTerm(props.index)}} className="delete-item"><span><FontAwesomeIcon icon={faMinus} size="1x" color="#ff1100"/></span>usuń rzecz</span>}
        </div>
    )}
  

export default Term;