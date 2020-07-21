function dateRange (dateSinceAccomodation, dateToAccomodation, dateSince, dateTo, state1, array, index, additionalStates){   
    const state2=additionalStates[0];
        if(state2[dateSince] && state2[dateTo]){
            if(new Date(state2[dateSince])>new Date(state1[dateSinceAccomodation]) || new Date(state2[dateTo])<new Date(state1[dateToAccomodation])){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
        
}
export default dateRange
