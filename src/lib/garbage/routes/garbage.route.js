
const express = require('express');
const router = express.Router();
const controller = require('../controller/garbage.controller');

router.get('/', controller.get);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/location', controller.updateLocation);
router.delete('/:id', controller.remove);

router.post('/:id/collect', controller.collect);
router.put('/:id/collectedDate', controller.updateCollectedDate);
router.get('/:id/collections', controller.getCollections);
router.get('/:id/latest-collect', controller.getLatestCollect);

module.exports = router;