const express = require('express');
const{getBootcamps,
      getBootcamp,
      createBootcamp,
      updateBootcamp,
      deleteBootcamp,
      getBootcampInRadius,
      bootcampPhotoUpload} = require('../controllers/bootcamps');


//Include other resourse routers
const courseRouter = require('./courses');


const router = express.Router();  //initialising router


//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/radius/:zipcode/:distance').get(getBootcampInRadius);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')  
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);




module.exports = router;