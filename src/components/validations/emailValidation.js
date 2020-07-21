function emailValidation(name, args, state){
    return state[name].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false 
 }
 export default emailValidation