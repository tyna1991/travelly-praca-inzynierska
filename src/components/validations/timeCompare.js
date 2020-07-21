function timeCompare (time1, time2, dataSince, dataTo, state){
    if(state[dataSince]===state[dataTo]){
        return state[time1] > state[time2]
    } else{
        return false
    }

    
}
export default timeCompare