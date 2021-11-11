const express = require('express');
const{getBootcamps,
      getBootcamp,
      createBootcamp,
      updateBootcamp,
      deleteBootcamp,
      getBootcampInRadius,
      bootcampPhotoUpload} = require('../controllers/bootcamps');


const Bootcamp = require('../models/Bootcamp');

const advancedResults = require('../middleware/advancedResults');


//Include other resourse routers
const courseRouter = require('./courses');


const router = express.Router();  //initialising router

const {protect} = require('../middleware/auth');


//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router.route('/:id/photo').put(protect, bootcampPhotoUpload);

router
  .route('/radius/:zipcode/:distance').get(getBootcampInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router
  .route('/:id')  
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);




module.exports = router;