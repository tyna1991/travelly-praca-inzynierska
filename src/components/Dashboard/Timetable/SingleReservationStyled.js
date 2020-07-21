import React from 'react';


class SingleReservationStyled extends React.Component{
    constructor(props){
    super(props)
    this.state={
        blockStyle:{
        display:'block',
        top:'',
        position: 'absolute',
        opacity:0,
        },
    }
  }
  componentDidMount(){
    this.applyStyle(this.props.start);
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.timelineStart!==this.props.timelineStart){
        this.applyStyle(this.props.start, this.props.end, this.props.color);
    }
  }
  getScheduleTimestamp(time) {
    var timeArray = time.split(':');
    var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    return timeStamp;
    };
  applyStyle(time){
    let timeline = document.querySelector('.timeline');
    let timelineLi = timeline.querySelector('li');
    let timelineLiHeight;
    timelineLiHeight = timelineLi.offsetHeight;
    let start = this.getScheduleTimestamp(time);
     let eventTop = timelineLiHeight * (start - this.getScheduleTimestamp(this.props.timelineStart) ) / 60 //timeline Unit
    this.setState({
        ...this.state,
        blockStyle:{
        ...this.state.blockStyle,
        top:eventTop,
        opacity:1,
        },
    })
  }
  
    render(){
        return (
            <span className='block-style reservation ' onClick={()=>this.props.onClickHandler(this.props.index, 'reservation')} start={this.props.start} style={this.state.blockStyle}>
            <div className={`reservation-detalis clearfix`}><span className='name'>{this.props.name}</span> 
            <span className='hours'><span>{this.props.type==='checkIn' ?'Godzina zameldowania' : 'Godzina wymeldowania'}</span>{this.props.start}</span>
            <span className='triangle'></span></div></span>
        )
        
    }
}
export default SingleReservationStyled