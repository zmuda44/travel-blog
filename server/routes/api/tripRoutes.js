const router = require('express').Router();
const { Trip } = require('../../models')

router.post('/create', async (req, res) => {
  const { location, journalEntry, tripDate, startTripDate, endTripDate } = req.body
  try {
    const trip = await Trip.create({
      location,
      journalEntry,
      startTripDate,
      endTripDate
    })

    
    console.log(trip)
  }
  catch (err) {
    console.log(err)
  }  
})

module.exports = router