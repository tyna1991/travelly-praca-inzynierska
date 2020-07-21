import React from 'react';
import preloader from './../../assets/preloader.svg'


function Preloader (){
    return(<div className='preloader'>
        <img className='preloader-img' src={preloader} alt="preloader"/>
    </div>)
}
export default Preloader