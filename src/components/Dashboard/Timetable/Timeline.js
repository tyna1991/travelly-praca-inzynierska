import React from 'react';

class Timeline extends React.Component{
    constructor(props){
    super(props)
    this.state={
      start:this.props.start,
      end:this.props.end
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.start!==this.props.start || prevProps.end!==this.props.end){
        this.setState({
            ...this.state,
            start:this.props.start,
            end:this.props.end,
        })
    }
  }
  TimelineHours=[]
    render(){
        this.TimelineHours = [];
        let startArray=this.state.start.split(':');
        let endArray=this.state.end.split(':');
        let startFromArray = startArray[0];
        for (let i=0; i<=endArray[0]-startFromArray; i++){
            let tempStart=startArray;
            this.TimelineHours[i]=<li key={tempStart[0]+i+":"+tempStart[1]}><span>{parseInt(tempStart[0])+i+":"+tempStart[1] }</span></li>
        }
        var element = document.getElementsByClassName('timetable-info');
        const width = element.length ? element[0].offsetWidth : 0;
        return(
            <div className="timeline" style={{width:width}}> 
                <ul>
                    {this.TimelineHours}
                </ul>
            </div>
        )
    }
}
export default Timeline