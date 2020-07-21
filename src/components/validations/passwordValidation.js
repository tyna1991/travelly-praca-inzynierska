function passwordValidation(name, args, state){
   return state[name].match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/) ? true : false 
}
export default passwordValidation