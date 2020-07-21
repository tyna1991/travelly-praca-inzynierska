function isCountryDoubled (countryName, args, state, array){
    return array.filter(country => {
            return (state[countryName]===country.nameCountry && country.nameCountry) && true 
        }).length>1 ? true : false
}
export default isCountryDoubled