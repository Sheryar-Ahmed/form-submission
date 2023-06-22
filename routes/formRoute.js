const express = require('express');
const { formController } = require('../controllers/PurchaseController');
const { refinanceController } = require('../controllers/RefinanceController');


const router = express.Router();


router.route('/submit/purchase').post(formController);
router.route('/submit/refinance').post(refinanceController);


module.exports = router;