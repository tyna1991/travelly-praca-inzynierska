import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


function RightArrow (props){
  return (
    <span className="arrow-nav right" onClick={()=>{props.scrollParam ? props.nextSlide(props.scrollParam) : props.nextSlide()}} style={{display:props.hideElement && 'none'}} >
                          {props.isCountry ? <span>Następny kraj</span> : <span>Dalej</span>}
                          <FontAwesomeIcon icon={faChevronRight} size="1x" color="#fa7e2e"/>
    </span>
  );
}

export default RightArrow;
