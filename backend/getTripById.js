let Trip = require('./models/trip.model')

module.exports = {
    findTripById
}

async function findTripById(paramsId, userId){
    let reqId;
    if(paramsId===undefined || paramsId==0){
        await Trip.findOne({user:userId}).sort({timeStamp:-1})
        .then(data =>{
            if(data){
            reqId = data._id
            }else{
                return res.status(200).send([]);
            }
        })
        .catch(err=>{return res.status(400).json('message:' + err)})
    }else{
        reqId=paramsId
    }
    return reqId;
}
