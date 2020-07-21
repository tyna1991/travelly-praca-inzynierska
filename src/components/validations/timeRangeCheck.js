function timeRangeCheck (date, time1, time2, state, array, indexOfState){
    let array_temp = array.map((event, index) => { 
        if(indexOfState===index){ //==
            return true
        }else{
            if(state[date]===event.date){ //==
                var dateString1=state[date] +' '+ state[time1];
                var dateString2=state[date] +' '+ state[time2];
                var dateString3=event.date +' '+ event[time1];
                var dateString4=event.date +' '+ event[time2];
                var x =new Date(dateString1).getTime();
                var y =new Date(dateString2).getTime();
                var a =new Date(dateString3).getTime();
                var b =new Date(dateString4).getTime();
                    if((Math.min(x, y) <= Math.max(a, b) && Math.max(x, y) >= Math.min(a, b))){
                        return false
                    }else{
                        return true
                    }
            }else{
                return true
            }
        }
})

array_temp = array_temp.filter((element) => {
   return !element
});
return array_temp.length ? false : true
}
export default timeRangeCheck