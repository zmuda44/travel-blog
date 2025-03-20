const router = require('express').Router();
const testRoutes = require('./testRoutes')

router.use('/test', testRoutes)

module.exports = router;