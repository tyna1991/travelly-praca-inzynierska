const express = require ('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const env = require("./env.json")

require('dotenv').config();
const app  = express();
const path = require('path');
console.log(process.env.PORT);
const port = process.env.PORT || 80



const corsOptions = {
    credentials: true, origin: 'https://travelly-281214.ew.r.appspot.com'
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());


const uri = env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database conection success")
})

const tripRouter = require('./routes/trips')
const usersRouter = require('./routes/users')
const countriesRouter = require('./routes/countries')
const checklistRouter = require('./routes/checklist')
const directionsRouter = require('./routes/directions')
const refreshToken = require('./routes/refreshToken')

app.use('/trips', tripRouter)
app.use('/users', usersRouter)
app.use('/countries', countriesRouter)
app.use('/checklist', checklistRouter)
app.use('/directions', directionsRouter)
app.use('/refresh_token', refreshToken)

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../build')));
app.get('*', function(req, res) {
    console.log(__dirname);
  res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})