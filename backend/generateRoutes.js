module.exports = {
    generateRoutes
}

function generateRoutes(eventsArray){
    function compare(a,b){
        var time1 = parseFloat(a.replace(':','.'));
        var time2 = parseFloat(b.replace(':','.'));
        if (time1 < time2) return -1;
        if (time1 > time2) return 1;
        return 0;
    }
    const grouped = groupBy(eventsArray, event => event.date);
    let routes=[];
    for (let key of grouped.keys()) {
        const arrayOfValuesAsc = grouped.get(key).sort((a,b)=>compare(a.since,b.since));
        arrayOfValuesAsc.forEach((value, index)=>{
            if(index!==arrayOfValuesAsc.length-1){
                const route={
                    _id:value._id,
                    tripId:value.trip,
                    date:value.date,
                    from:value._id,
                    to:arrayOfValuesAsc[index+1]._id,
                }
                routes.push(route);
            } 
        })
      }
      return routes;
}
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         if(key){
            const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
         }
    });
    return map;
}
