const userDetailsController = require('../controllers/userDetails.Controller');
const router = require('express').Router();

router.route('/userdetails')
            .get(userDetailsController.index)
            .post(userDetailsController.new);

router.route('/authenticate')
            .post(userDetailsController.authenticate);


// Export API routes
module.exports = router;
