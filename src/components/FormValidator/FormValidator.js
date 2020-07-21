class FormValidator {
    constructor(validations) {
      // validations is an array of form-specific validation rules
      this.validations = validations;
    }
    validate(state) {
        let validation = this.valid(state);
        this.validations.forEach(rule => {
          if ((validation[rule.field] instanceof Array && validation[rule.field].filter(elem=>{return true && elem.isInvalid })) || (validation[rule.field]!==undefined && !validation[rule.field].isInvalid)) {
            if(state[rule.stateName[0]] instanceof Array){
              state[rule.stateName[0]].forEach((stateElem, index)=>{
                    validateElement(stateElem, index, state)
                })
            }else{
                validateElement(state[rule.stateName[0]])
            }
            function validateElement(stateElem, index, array){
                //const field_value = state[rule.field]
                const args = rule.args || [''];
                const validation_method = rule.method
               // if(state[rule.field]){
                let firstStateByRule='';
                let otherRules=[];
                const rules = rule.stateName;
                if(array!==undefined){
                  rules.forEach((element, index) => {
                    if(index===0){
                      firstStateByRule = array[rule.stateName[index]];
                    }
                    else{
                      otherRules.push(array[rule.stateName[index]])
                    }
                  });
                }
                    if(validation_method(rule.field, ...args, stateElem, firstStateByRule, index, otherRules) !== rule.validWhen) { 
                    index!==undefined ? validation[rule.field][index] = { 
                    isInvalid: true, 
                    message: rule.message,
                    index: index
                  } :
                  validation[rule.field] = { 
                    isInvalid: true, 
                    message: rule.message,
                  }

                  validation.isValid = false;
                }
                //}
                
            }
            
          }
        });
        return validation;
      }
      valid(state) {
        const validation = {}
        this.validations.forEach(rule => (
            state && state[rule.stateName[0]] instanceof Array ? state[rule.stateName[0]].forEach((el, index)=>{
              validation[rule.field] ? validation[rule.field].push({ isInvalid: false, message: '', index:index}): validation[rule.field] = [{ isInvalid: false, message: '', index:index}]
            }): validation[rule.field] = { isInvalid: false, message: '',  }
        ));
        return { isValid: true, ...validation };
      }
      
  }
  export default FormValidator;