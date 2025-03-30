const router = require('express').Router();
const { Trip, User } = require('../../models')
const { signToken, AuthenticationError, authMiddleware } = require("../../utils/auth");


router.post('/create', authMiddleware, async (req, res) => {

  const { location, journalEntry, tripDate, startTripDate, endTripDate, dreamTrip } = req.body
  try {
    const trip = await Trip.create({
      location,
      journalEntry,
      startTripDate,
      endTripDate,
      dreamTrip
    })

    if (!req.user) {
      return res.status(401).send({ error: 'Authentication required' });
    }

    const user = await User.findOneAndUpdate (
      { _id: req.user._id },
      { $addToSet: { trips: trip } },
      { new: true, runValidators: true }
    )

    res.send( {user, trip} )
  }
  catch (err) {
    console.log(err)
  }  
})

module.exports = router