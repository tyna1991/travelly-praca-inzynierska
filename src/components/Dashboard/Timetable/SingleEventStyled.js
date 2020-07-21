import React from 'react';


class SingleEventStyled extends React.Component{
    constructor(props){
    super(props)
    this.state={
        blockStyle:{
        display:'block',
        top:'',
        backgroundColor:'',
        position: 'absolute',
        width:'100%',
        height:'',
        opacity:0,
        zIndex:'0',
        transform: 'translate(0px, -20px)',
        transition:'opacity,transform 1s'
        },
        showInfo:false,
        bottomInfo:0
    }
  }

  componentDidMount(){
    this.applyStyle(this.props.start, this.props.end, this.props.color);
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.start!==this.props.start || prevProps.end!==this.props.end || prevProps.color!==this.props.color || prevProps.timelineStart!==this.props.timelineStart){
        this.applyStyle(this.props.start, this.props.end, this.props.color);
    }
  }
  getScheduleTimestamp(time) {
    var timeArray = time.split(':');
    var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    return timeStamp;
    };
  applyStyle(start, end, color){
    let timeline = document.querySelector('.timeline');
    let timelineLi = timeline.querySelector('li');
    let timelineLiHeight;
    timelineLiHeight = timelineLi.offsetHeight;
    let startEvent = this.getScheduleTimestamp(start);
    let durationEvent = this.getScheduleTimestamp(end) - startEvent;
     let eventTop = timelineLiHeight * (startEvent - this.getScheduleTimestamp(this.props.timelineStart) ) / 60 //timeline Unit
     let eventHeight = timelineLiHeight * durationEvent / 60;
    this.setState({
        ...this.state,
        blockStyle:{
        ...this.state.blockStyle,
        top:eventTop,
        backgroundColor:color,
        height:eventHeight,
        opacity:1,
        transform: 'translate(0px, 0px)',
        },
        showInfo:eventHeight<60 ? true : false,
        bottomInfo:eventHeight<60 ? (eventHeight+15)+'px' : '50%',
    })
  }
  
    render(){
        return (
            <span className='block-style' onClick={()=>this.props.onClickHandler(this.props.index, 'event')} start={this.props.start} end={this.props.end} style={this.state.blockStyle}>
            <div className={`event-detalis ${this.state.showInfo ? 'small' : ''}`} style={{bottom:this.state.bottomInfo}}><span className='name'>{this.props.name}</span> <span className='hours'>{this.props.start} - {this.props.end}</span><span className='triangle'></span></div></span>
        )
        
    }
}
export default SingleEventStyled