const fetch = require("node-fetch");
module.exports = {
    getObjectFromApi
}

async function getObjectFromApi (pointAdress, id) {
    return await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${pointAdress}&key=${process.env.REACT_APP_GOOGLE_API}`))
    .then(response=>{
        if(response.statusText==="OK")  {
            return response.json()
        }}
     )
     .then(response=>{
        return {response, id}
     })
    .catch(error=>{return res.status(400).send({message:error})})
} 
