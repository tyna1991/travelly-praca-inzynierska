import React from 'react';
import LeftArrow from './../slider/LeftArrow';
import RightArrow from './../slider/RightArrow';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { tripActions } from './../../../_actions/trip.actions';
import CountryInformation from './../slider/CountryInformation';
import AddInfoModal from './AddInfoModal';
import Preloader from '../../Preloader';
import {countryActions} from '../../../_actions/country.actions';
import {countryInfoActions} from '../../../_actions/countryInfo.actions';

class LastTripsDetalis extends React.Component{
  constructor(props){
    super(props)
    this.state={
      navigationEndRight:false,
      navigationEndLeft:true,
      currentIndex:0,
      translateValue: 0,
      openAddInfoModal:false,
      mainInfo:[],
      newMainInfo:'',
      countries:[],
    }
    this.goToNextSlide=this.goToNextSlide.bind(this)
    this.goToPrevSlide=this.goToPrevSlide.bind(this)
    this.addInformationsClickHandler=this.addInformationsClickHandler.bind(this)
    this.onChangeHandler=this.onChangeHandler.bind(this)
    this.saveInfo=this.saveInfo.bind(this)
  }
  componentDidMount(){
    this.props.removeCountries();
    this.props.getTripDashboard(this.props.match.params.id);
    this.props.getCountryInfo(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.data !== prevProps.data) {
      // const textArray = this.props.trip.countries.length ? this.props.trip.countries.forEach(country=>{
      //   this.props.trip.countriesInfo.map(info=>{
      //     if(info.idCountry===country.id){
      //       return info.text
      //     }
      //   })
      // }) : []
        this.setState({
         // mainInfo:textArray,
          countries:this.props.data.countries,
          currentIndex:0
        })
      }
      if (this.props.data.countries !== prevProps.data.countries) {
        //this.props.removeCountries();
        }
        // if(this.state.countries !== prevState.countries){
        //   this.setState({
        //     countries:this.props.trip.countries
        //   })
        // }
    }
  goToPrevSlide() {
    this.setState(prevState => ({
      currentIndex: this.state.currentIndex !== 0 && prevState.currentIndex - 1,
      translateValue: this.state.currentIndex !== 0 && prevState.translateValue + (this.slideWidth()),
      navigationEndRight: this.state.currentIndex !== 1 ? false : false,
      navigationEndLeft: this.state.currentIndex !== 1 ? false : true
    }));
  }
goToNextSlide (){
  this.setState(prevState => ({
    currentIndex: prevState.currentIndex + 1,
    translateValue: prevState.translateValue + -(this.slideWidth()),
    navigationEndLeft: this.state.currentIndex !== this.props.data.countries.length - 2? false: false, //hide
    navigationEndRight: this.state.currentIndex !== this.props.data.countries.length - 2 ? false : true,
  }));
}

  addInformationsClickHandler(){
    this.setState(prevState=>{
      const searchForInfo = this.props.countriesInfoData.countriesInfo
      .filter(info=>{
        if(info.idCountry===this.props.data.countries[this.state.currentIndex].id)
        {return info} else{
          return ""
        }
      })
      const info = searchForInfo.length ? searchForInfo[0].text : ''
      return{
        openAddInfoModal: !prevState.openAddInfoModal,
        newMainInfo:info,
      }
    })
  }
  onChangeHandler(e){
    e.preventDefault();
    const{name, value} = e.target;
    this.setState({
      ...this.state,
      [name]:value
    })
  }
  saveInfo(index){
    // let mainInfo = this.state.mainInfo;
    // mainInfo[index] = this.state.newMainInfo
    //   this.setState({
    //     ...this.state,
    //     mainInfo,
    //   })

      this.props.addCountryInfo(this.props.data.trip.id, this.props.data.countries[index].id, this.state.newMainInfo);
      this.addInformationsClickHandler()
      //this.props.getTripDashboard(this.props.match.params.id);
  }
  slideWidth(){
    return document.getElementsByClassName('slider-element')[0].offsetWidth;
    }
    render(){
      if(this.props.loading || this.props.countriesInfoData.loading) return  <div className="main-1 main-1-dashboard"><Preloader/> </div>;
      if (!this.props.data.trip.id && !this.props.loading) return <div className="main-1 main-1-dashboard"><h1>Brak podróży</h1></div>;
      return(
            <div className="main-1 main-1-dashboard">
            {/* {this.props.loading && <Preloader/> } */}
            <div className="main-1-current-trip">
            <div>

            <div className='trip-buttons'>
            <h2 className="trip-name">{this.props.data.trip.tripName} </h2>
            <div className="nav-arrows-wrapper country">
                      <LeftArrow isCountry={true} prevSlide={this.goToPrevSlide} hideElement={this.state.navigationEndLeft}/>
                      {this.props.data.countries.length>1 && <RightArrow isCountry={true} nextSlide={this.goToNextSlide} hideElement={this.state.navigationEndRight}/>}
            </div>
            </div>
            <h3 className="date">Termin: {this.props.data.trip.dateSince} -  {this.props.data.trip.dateTo}</h3>
            </div>
            <div className="country-info slider">
                      <div className="slider-wrapper" style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                      }}>
                        {this.props.data.countries.map((country, index)=>{
                      return (
                    <CountryInformation tripId={this.props.data.trip.id} addInformationsClickHandler={this.addInformationsClickHandler} mainInfo={this.props.countriesInfoData.countriesInfo} key={country.id} id={country.id} index={index} info={country.info} length={this.props.data.countries.length}
                    navigationRight={this.navigationRight} />
                    )
                    })}
                      </div>
            </div>
            </div>
            {this.state.openAddInfoModal && <AddInfoModal index={this.state.currentIndex} onChangeHandler={this.onChangeHandler} newMainInfo={this.state.newMainInfo} saveInfo={this.saveInfo} addInformationsClickHandler={this.addInformationsClickHandler}/> }
            </div>
        )
    }
}
function mapState(state) {
  const { trips } = state.getTrips;
  const { data, loading } = state.getTrip;
  const { countriesInfoData} = state.getCountryInfo;
  return { trips, loading, data, countriesInfoData };
}

const actionCreators = {
  getTrips:tripActions.getAll,
  getTripDashboard: tripActions.getDashboardTrip,
  addCountryInfo: countryInfoActions.addCountryInfo,
  removeCountries:countryActions.removeCountries,
  getCountryInfo:countryInfoActions.getCountryInfo
}

export default withRouter(connect(mapState, actionCreators)(LastTripsDetalis));