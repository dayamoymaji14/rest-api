const { Router } = require('express');

const getRecords = require('../../apis/getRecords');

const router = Router();

router.post('/v1/records', getRecords);

module.exports = router;