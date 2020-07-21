function loginValidation(name, args, state){
    return state[name].length>2 ? true : false 
 }
 export default loginValidation