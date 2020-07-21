import React from 'react';
import '../../../App.css';
import {tripActions} from './../../../_actions/trip.actions'
import { connect } from 'react-redux';
import Preloader from '../../Preloader';
import Script from 'react-load-script';
import DirectionDetalis from './DirectionDetalis';
import { withRouter } from 'react-router-dom';


/* global google */

class Directions extends React.Component{    
    constructor(){
            super();
            this.state={
                date:'',
                route:'',
                idFrom:'',
                idTo:'',
                place_id_from:'',
                place_id_to:'',
                mode:'DRIVING',
                modePolish:'',
                distance:'',
                duration:''
            }
            this.onChangeHandler=this.onChangeHandler.bind(this)
            this.checkRoutesOption=this.checkRoutesOption.bind(this)
            this.getTimeOfStart=this.getTimeOfStart.bind(this)
            this.getTimeOfEnd=this.getTimeOfEnd.bind(this)
            this.generateRoute=this.generateRoute.bind(this)
        }  
        componentDidMount(){
            this.props.getData(this.props.match.params.id)
        }
        componentDidUpdate(prevProps, prevState){
            if(prevProps.data.trip!==this.props.data.trip){
                this.setState({
                    date:this.props.data.trip.dateSince
                })
            }
            if(prevState.date!==this.state.date){
                this.checkRoutesOption()
            }
            if (prevState.place_id_from!==this.state.place_id_from || prevState.place_id_to!==this.state.place_id_to){
                //this.initMap()
            }
        }
        onChangeHandler(e){
            const {value, name, selectedIndex} = e.target;
            if(name==='route' || name==='modePolish'){
                var optionElement = e.target.childNodes[selectedIndex]
                var idFrom =  optionElement.getAttribute('idfrom');
                var idTo =  optionElement.getAttribute('idto');
                var mode= optionElement.getAttribute('mode');
                const tripDestinationFrom = this.props.data.destinations.filter(dest=>{return dest.id===idFrom});
                const tripDestinationTo = this.props.data.destinations.filter(dest=>{return dest.id===idTo});
                const place_id_from = tripDestinationFrom.length ? tripDestinationFrom[0].place_id : '';
                const place_id_to = tripDestinationTo.length ? tripDestinationTo[0].place_id : '';
                this.setState(prevState=>{
                    return {
                    ...this.state,
                    [name]:value,
                    mode: mode ? mode : prevState.mode,
                    idFrom: idFrom ? idFrom : prevState.idFrom,
                    idTo: idTo ? idTo : prevState.idTo,
                    place_id_from: place_id_from ? place_id_from : prevState.place_id_from,
                    place_id_to: place_id_to ? place_id_to : prevState.place_id_to}
                 }
                 ,()=>this.generateRoute()
                )
                
            }else{
                this.setState({
                    ...this.state,
                    [name]:value
                })
            }
        }
        
        generateRoute(){
            /* global google */
            var start = this.state.place_id_from;
            var end = this.state.place_id_to;
            var selectedMode = this.state.mode;
            var request = {
              origin: {'placeId': start},
              destination: {'placeId': end},
              travelMode: google.maps.TravelMode[selectedMode],
            //   drivingOptions: {
            //     departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
            //     trafficModel: 'optimistic'
            //   }
            };
            var directionsService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer();
            document.getElementById('right-panel').innerHTML='';
            var map = new google.maps.Map(document.getElementById('map'));
            // Create a renderer for directions and bind it to the map.
            var rendererOptions = {
                map: map,
                panel: document.getElementById('right-panel')
            }
            directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions)
            directionsService.route(request, function(result, status) {
              if (status === 'OK') {
                directionsRenderer.setDirections(result);
                showSteps(result);
              }
            });
            var showSteps = (directionResult) => {
                // For each step, place a marker, and add the text to the marker's
                // info window. Also attach the marker to an array so we
                // can keep track of it and remove it when calculating new
                // routes.
                
                var myRoute = directionResult.routes[0].legs[0];
                for (var i = 0; i < myRoute.steps.length; i++) {
                    var marker = new google.maps.Marker({
                      position: myRoute.steps[i].start_point,
                      map: map
                    });
                this.setState({
                    ...this.state,
                    distance: myRoute.distance.text,
                    duration: myRoute.duration.text
                })
                    attachInstructionText(marker, myRoute.steps[i].instructions, map); 
                //markerArray[i] = marker;
                }
              }
                 
              var attachInstructionText = (marker, text) => {
                var stepDisplay= '';
                stepDisplay = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', function() {
                  stepDisplay.setContent(text);
                  stepDisplay.open(map, marker);
                });
              }
        }
        
        addDays = (currentDate, days) => {
            var date = new Date(currentDate);
            date.setDate(date.getDate() + days);
            return date;
        }
        changeDateFormat(date){
        return date.getFullYear()+"-"+('0'+(parseInt(date.getMonth())+1)).slice(-2)+"-"+date.getDate();
        }
        getDates(startDate, stopDate) {
            startDate = new Date(startDate);
            stopDate = new Date(stopDate);
            var dateArray = [];
            let currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(this.changeDateFormat(currentDate));
                currentDate = this.addDays(currentDate, 1);
            }
            return dateArray;
        }
        checkRoutesOption(){
            return this.props.data.routes.filter(route=>{return route.date===this.state.date})
            .map(route=>{
                return route = {
                    from:this.props.data.events.filter(element=>{
                        return element.id===route.from})[0].destination,
                    to:this.props.data.events.filter(element=>{
                        return element.id===route.to})[0].destination,
                }
            })
        }
        getNameByEventId(id){
            // const event = this.props.data.events.filter(element=>{
            //     return element.id==id
            // })
            const destination = this.props.data.destinations.filter(element=>{
                return element.id===id
            })
            return destination.length ? destination[0].name : '';
        }
        getTimeOfStart(){
            const event = this.props.data.events.filter(event=>{return event.id===this.state.idFrom});
            return event.length ? event[0].to: ''
        }
        getTimeOfEnd(){
            const event = this.props.data.events.filter(event=>{return event.id===this.state.idTo});
            return event.length ? event[0].since: ''
        }
        
  
    render(){
        return(
            <div className="directions-main main-1-dashboard">
               
            {this.props.loading && <Preloader/>}
            <div className='set-date-and-route'><label>Wybierz dzień: <select onChange={this.onChangeHandler} name='date' value={this.state.date}>{this.getDates(this.props.data.trip.dateSince, this.props.data.trip.dateTo).map(element=>(<option>{element}</option>))}</select></label>
            <label>Wybierz trasę: <select onChange={this.onChangeHandler} name='route' value={this.state.route}><option idfrom='' idto='' value=''>-</option>{this.checkRoutesOption().map(elem=>(<option idfrom={elem.from} idto={elem.to}>{this.getNameByEventId(elem.from)} -> {this.getNameByEventId(elem.to)}</option>))}</select></label></div>
            {<DirectionDetalis distance={this.state.distance} duration={this.state.duration} onChangeHandler={this.onChangeHandler} mode={this.state.mode} modePolish={this.state.modePolish} route={this.state.route} getTimeOfStart={this.getTimeOfStart} getTimeOfEnd={this.getTimeOfEnd} />}
            
            <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}`}         
                        
                    />
            </div>
          
        )
    }
}
function mapState(state) {
    const { data, loading } = state.getTrip;
    return { loading, data };
  }
  
  const actionCreators = {
    getData:tripActions.getDirections,
  }
  
  export default withRouter(connect(mapState, actionCreators)(Directions));