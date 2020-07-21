import React from 'react';

function FormErrors ({formErrors}){
    const Errors = Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
          return (
            <span key={i}>{formErrors[fieldName]}</span>
          )        
        } else {
          return '';
        }
    })
    return(
        <div className='error-block'>
            {Errors}
        </div>
    )
    }
    export default FormErrors