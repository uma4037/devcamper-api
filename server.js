const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


//Load env vars
dotenv.config({path: './config/config.env'});


//Connect to database
connectDB();


//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');



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


//Cookie Parser
app.use(cookieParser());


//Dev logging middleware
if(process.env.NODE_ENV === 'development'){     //run only in development
    app.use(morgan('dev'));
}


//File uploading
app.use(fileupload());


//Sanitize data
app.use(mongoSanitize());


//Prevent XSS attacks
app.use(xss());


//Set security header
app.use(helmet());


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);


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

