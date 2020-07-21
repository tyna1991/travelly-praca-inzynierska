import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'



class CountryInformation extends React.Component{
    constructor(){
      super()
      this.state={
        widthOfElement:0
      }
      this.updateDimensions=this.updateDimensions.bind(this)
    }
    componentDidMount(){
        // this.props.getCountryById(this.props.id);
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }
    updateDimensions(){
      let nav = document.getElementsByClassName('trip-buttons')[1];
      this.setState({ widthOfElement: nav.offsetWidth + 50});
    };
    sliderRender(){
      let slider = document.getElementsByClassName('slider')[0];
      let sliderElement = document.getElementsByClassName('slider-element')[0];
      if(sliderElement){
        let slideWidth = sliderElement.offsetWidth;
        slider.style.width=slideWidth+"px";
      }
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }
    render(){
        const{countryOfTheWorld, id} = this.props
        const countryOfTheWorldFilteredIndex = countryOfTheWorld.findIndex(element=>{return element._id===id})
        const searchForInfo = this.props.mainInfo.filter(info=>{if(info.idCountry===this.props.id){return info}else{return ''}});
        const info=searchForInfo.length ? searchForInfo[0].text : '';
        let infoLabel = !searchForInfo.length ? 'Dodaj informacje dotyczące kraju' : 'Zmień informacje dotyczące kraju';
        return(
            <div className="slider-element">  
                        {countryOfTheWorldFilteredIndex>-1 && 
                        <div style={{width:this.state.widthOfElement+'px'}}>
                        <span className="country">Kraj podróży: <span className="country-name">{countryOfTheWorld[countryOfTheWorldFilteredIndex].name}</span></span>
                        <div className="country-info-main-info">
                          <span className="main-info">język urzędowy: <span className="data">{countryOfTheWorld[countryOfTheWorldFilteredIndex].language}</span></span>
                          <span className="main-info">stolica: <span className="data">{countryOfTheWorld[countryOfTheWorldFilteredIndex].capitalCity}</span></span>
                          <span className="main-info">jednostka monetarna: <span className="data">{countryOfTheWorld[countryOfTheWorldFilteredIndex].currency}</span> </span>
                          <span className="main-info">religia dominujaca: <span className="data">{countryOfTheWorld[countryOfTheWorldFilteredIndex].religion}</span> </span>
                        <span className="main-info">unia europejska: <span className="data">{(countryOfTheWorld[countryOfTheWorldFilteredIndex].UE==='1') ? <FontAwesomeIcon icon={faCheck} size="1x" color="#fa7e2d"/> : <FontAwesomeIcon icon={faTimes} size="1x" color="#fa7e2d"/>}</span> </span>
                          <div className='main-information-get'>
                          {info && <h3>Ważne informacje</h3>}
                          <span className="main-info">{info}</span>
                          <button className="action-button light" onClick={()=>this.props.addInformationsClickHandler(this.props.index)}>{infoLabel}</button>
                          </div>
                        </div>
                        </div>}
                        
           </div>

        )
    }
}
function mapState(state) {
    // const { country } = state.getCountry;
     const { countryOfTheWorld } = state.getTrip.data;
    return { countryOfTheWorld};
  }
  
  const actionCreators = {
    // getCountryById:countryActions.getCountryById,
    
  }
  
  // const connectedHomePage = connect(mapState, actionCreators)(Main);
  // export { connectedHomePage as Main };
  export default connect(mapState, actionCreators)(CountryInformation);