
function dateValidation (dateSince, dateTo, state){
    if(!(state[dateSince] && state[dateTo])){
        return true
    }
    let date1=new Date(state[dateSince]);
    let date2=new Date(state[dateTo]);
    return date1<=date2
}
export default dateValidation
