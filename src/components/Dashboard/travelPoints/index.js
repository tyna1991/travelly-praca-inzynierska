

import React from 'react';
import '../../../App.css';
import { connect } from 'react-redux';
import { tripActions } from './../../../_actions/trip.actions';
import Point from './Point';
import Script from 'react-load-script';
import Preloader from '../../Preloader';
import { withRouter } from 'react-router-dom'

/* global google */

class TravelPoints extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            isOpenDestination:new Array(this.props.data.destinations.length).fill(false),
            isOpenAccomodation:new Array(this.props.data.accomodations.length).fill(false),
            positions:[],
            requests:[],
            nextAddress:0,
            delay:100,
            map:'',
            bounds:'',
        }
        this.isOpen=this.isOpen.bind(this)
        this.markers=this.markers(this)
        this.getAdresses = this.getAdresses.bind(this)
        this.generateMarkers = this.generateMarkers.bind(this)
        this.map='';
        this.bounds='';
        this.initMap=this.initMap.bind(this)
        this.generateRequests=this.generateRequests.bind(this)
      }
      isOpen(indexOfPoint, pointCheck){
        const isOpen = this.state[pointCheck].map((bool, index)=>{
          if (index===indexOfPoint){
            return !bool
          }
          else{
            return bool
          }
        }) 
        this.setState(
           {
             ...this.state,
            [pointCheck]:isOpen
          }
        )
     }
  shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => 
    obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  );
      componentDidMount(){
          this.props.getTravelPointsTrip(this.props.match.params.id);
      }
      
    //   async componentDidUpdate(prevProps){
    //       if(prevProps.data.trip.id!==undefined){
    //         if(prevProps.data.trip.id !== this.props.data.trip.id){
    //             this.props.getTravelPointsTrip(this.props.data.trip.id);
    //         }
    //       }
    // }
    componentWillUnmount(){
      window.clearTimeout(this.timer);
    }
      google=window.google

      initMap(){
        this.generateRequests();
      }
      positions=[]
      markers(bounds){
        //marekry?
      }
      timer;
      generateRequests(){

            if(this.props.loadedPoints===undefined){
                const loading = setInterval(()=>{
                  if(this.props!==undefined && !this.props.loading){
                    clearInterval(loading);
                    this.generateRequests()
                  }
                })
            }
            else{
            let requests=[];
            // var map = new google.maps.Map(document.getElementById('map'));
            if(this.props.data.destinations.length){
              this.props.data.destinations.concat(this.props.data.accomodations).forEach(element => 
                {
                  if(element.place_id){
                    let request = {
                      placeId: element.place_id,
                      fields:['geometry', 'name']
                    } 
                    requests.push(request);
                  }
                })
            this.setState({
               isOpenDestination:new Array(this.props.data.destinations.length).fill(false),
               isOpenAccomodation:new Array(this.props.data.accomodations.length).fill(false),
               requests,
               map :new google.maps.Map(document.getElementById('map'), {zoom: 0, center: {lat: 0, lng: 0}}),
               bounds: new google.maps.LatLngBounds(),
               
            },()=>{   
              this.generateMarkers()
            })
        }
      }
      }

      generateMarkers(){  
        if (this.state.nextAddress < this.state.requests.length) {
          this.timer = setTimeout(()=>{this.getAdresses(this.state.requests[this.state.nextAddress], this.generateMarkers)}, this.state.delay);
        } else {
          // We're done. Show map bounds
          //extend the bounds to include each marker's position
          this.state.map.fitBounds(this.state.bounds);
          var listener = google.maps.event.addListener(this.state.map, "idle", () => { 
            this.state.map.setZoom(this.state.map.getZoom()); 
            google.maps.event.removeListener(listener); 
          });
        }

      }
      getAdresses(request, next){
          var service = new google.maps.places.PlacesService(this.state.map); 
          service.getDetails(request, (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                let marker = new google.maps.Marker({
                  map: this.state.map,
                  placeId: place.place_id,
                  position: place.geometry.location,
                  title: place.name
                })
                this.state.bounds.extend(marker.position);
                this.setState(prevState=>{
                  return{
                    ...this.state,
                    nextAddress:prevState.nextAddress+1
                  }
                })
              }else{
                this.setState(prevState=>{
                  return{
                    ...this.state,
                    // nextAddress:prevState.nextAddress-1,
                    delay:prevState.delay+200
                  }
                })
              }
              next()
            } );   
          }
      
      

    
    render(){ 
        return(
            <div className='main-1-dashboard travel-points'>
              {this.props.loading && <Preloader/>}
                <h2>Punkty podróży</h2>
                <h4>Cele podróży</h4>
                <div className='points'>
                    <ul>
                         {this.props.data.destinations.map((destination, index)=>{
                             return <Point pointName='destinations' pointCheck={'isOpenDestination'} point={destination} isOpenFunction={this.isOpen} isOpenState={this.state.isOpenDestination} index={index}/>
                         })}  
                     </ul>             
                </div>
                <h4>Nocleg</h4>
                <div className='points'>
                <ul>
                         {this.props.data.accomodations.map((accomodation, index)=>{
                             return <Point pointName='accomodations' pointCheck={'isOpenAccomodation'} point={accomodation} isOpenFunction={this.isOpen} isOpenState={this.state.isOpenAccomodation} index={index}/>
                         })}  
                     </ul> 
                </div>
                <div id='map'>

                </div>
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&libraries=geometry,places`}          
                onLoad={this.initMap}        
                />
            </div>
        )
    }
}
function mapState(state) {
    const { data, loading, loadedPoints } = state.getTrip;
    return { loading, data, loadedPoints };
  }
  
  const actionCreators = {
    getTravelPointsTrip:tripActions.getTravelPointsTrip,
  }
  
  export default withRouter(connect(mapState, actionCreators)(TravelPoints));

