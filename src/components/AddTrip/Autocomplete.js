import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
      this.state={
        countryCode:'',
        city:''

      }
      this.autoCompleteInput=React.createRef();
      this.handleScriptLoad=this.handleScriptLoad.bind(this)
      this.handlePlaceSelect=this.handlePlaceSelect.bind(this)
  }
  componentDidMount(){
    let countryCode = this.props.countries.filter(country=>{
          return country.id===this.props.idCountry
   })
   
   countryCode = countryCode.length ? countryCode[0].code : '';
   this.setState({
      countryCode
   })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.idCountry!==this.props.idCountry || prevProps.countries!==this.props.countries){
      let countryCode = this.props.countries.filter(country=>{
            return country.id===this.props.idCountry
     })
     countryCode = countryCode.length ? countryCode[0].code : '';
     
     this.setState({
      countryCode
     })
    }
    this.handleScriptLoad()
  }
  // google=window.google;
  handleScriptLoad() { 
    /* global google */
    var options;
    if (this.state.countryCode){
      options = { types: ['establishment'], componentRestrictions: { country: this.state.countryCode } }; 
    }else{
      options = { types: ['establishment'] }; 
    }
    var input = document.getElementsByClassName('autocomplete-points');
    if (typeof google!=="undefined"){
    for (var i = 0; i < input.length; i++) {
      let autocomplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current, options);
      const className = this.autoCompleteInput.current.className.substring(0, this.autoCompleteInput.current.className.indexOf(' '));
      autocomplete.setFields(['address_components','formatted_address','name','opening_hours', 'place_id', ]);
      autocomplete.addListener('place_changed', ()=>{this.handlePlaceSelect(autocomplete, className)});             
    }
  }
}

  handlePlaceSelect = (autocomplete, className) => {
    const selectedObject = autocomplete.getPlace();
    const address = selectedObject.address_components;
    let opening_hours;
    if(selectedObject.opening_hours){
      opening_hours=selectedObject.opening_hours.weekday_text
    }
    if (address) {
      this.props.onSelect(this.props.idCountry, this.props.id, selectedObject.name, selectedObject.formatted_address, opening_hours, selectedObject.place_id, className)
    }
  }


  render() {
    return (
      <Fragment>
        <input
          ref={this.autoCompleteInput}
          id='autocomplete'
          type="text"
          onChange={this.props.onChange(this.props.idCountry, this.props.id)}
          value={this.props.valueProp}
          disabled={this.props.disabled}
          className={`${this.props.class} ${this.props.class}-autocomplete autocomplete-points`}
          name='name'
          onClick={this.props.onClick(this.props.idCountry, this.props.id)}
        />
        <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&libraries=places`}          
      onLoad={this.handleScriptLoad}        
      />
      </Fragment>
    );
  }
}

function mapState(state) {
    const { countries } = state.getCountries;
    return { countries };
}

export default connect(mapState)(Autocomplete);