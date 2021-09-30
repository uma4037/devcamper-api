const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


//Load env vars
dotenv.config({path: './config/config.env'});


//Connect to database
connectDB();


//Route files
const bootcamps = require('./routes/bootcamps')


const app = express();


//Body Parser
//For Express version >= 4.16.0 body-parser comes with express
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//For Express version less than 4.16.0
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());


//Dev logging middleware
if(process.env.NODE_ENV === 'development'){     //run only in development
    app.use(morgan('dev'));
}


//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);


//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Close server and exit process
    server.close( ()=> process.exit(1) );
})

