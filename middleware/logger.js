//@desc  Logs request to console
const logger = (req, res, next) => {
    // req.hello = 'Hello World';         //creating variable on req object which we'll have access to within routes coming after this
    // console.log('Middleware ran');

    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
    next();
};

module.exports = logger;