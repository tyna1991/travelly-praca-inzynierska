import React from 'react';
import '../../../App.css';
import PointDetalis from './PointDetalis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


class Points extends React.Component{
    render(){ 
        const {point} = this.props
        return(
            <li className={"more-info input-wrapper " + (!this.props.isOpenState[this.props.index] ? 'closed':'open')}>
                  <span onClick={()=>this.props.isOpenFunction(this.props.index, this.props.pointCheck)}>
                  <span className='point-name'>
                       {point.name}   
                </span>
                
                <span> 
                    {this.props.isOpenState[this.props.index] ? <FontAwesomeIcon icon={faChevronUp} size="1x" color="#fa7e2e"/> : <FontAwesomeIcon icon={faChevronDown} size="1x" color="#fa7e2e"/>}   </span>
                 </span>
                   {this.props.isOpenState[this.props.index] && <PointDetalis pointName={this.props.pointName} point={point} isOpen={this.props.isOpenState[this.props.index]}/>}
                   
            </li>
        )
    }

}
  export default Points

