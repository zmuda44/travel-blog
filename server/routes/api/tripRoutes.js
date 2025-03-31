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

//Delete route to delete trip 
// api/trips/:id

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id })

    if(!trip) {
      res.send("Problem deleting item from Trips")
    }

    const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $pull: { trips: req.params.id } },
        { new: true }
    )

            // const user = await User.findOneAndUpdate(
            //   { _id: context.user._id },
            //   { $pull: { trips: args.tripId } },
            //   { new: true }
            // ).populate('trips'); // Populate trips after the update

    res.send(trip)

  }
  catch (err) {
    console.log('error is ' + err)
  }
})

router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const trip = await Trip.findOneAndUpdate({ _id: req.params.id }, 
      { $set: { location: req.body.location, 
        journalEntry: req.body.journalEntry, 
        startTripDate: req.body.startTripDate, 
        endTripDate: req.body.endTripDate, 
        dreamTrip: req.body.dreamTrip } },
      { runValidators: true, new: true }
    )
  }
  catch (err) {
    console.log(err)
  }
})





module.exports = router