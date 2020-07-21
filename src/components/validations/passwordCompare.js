function passwordCompare(password1, password2, state){
    return state[password1]===state[password2] ? true : false 
 }
 export default passwordCompare