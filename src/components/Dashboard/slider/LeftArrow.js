import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function LeftArrow(props){
  return (
    <span className="arrow-nav left" onClick={()=>{props.scrollParam ? props.prevSlide(props.scrollParam) : props.prevSlide()}} style={{display:props.hideElement && 'none'}}>
                          {props.isCountry ? <span>Poprzedni kraj</span> : <span>Wstecz</span>}
                          <FontAwesomeIcon icon={faChevronLeft} size="1x" color="#fa7e2e"/>
    </span>
  );
}

export default LeftArrow;