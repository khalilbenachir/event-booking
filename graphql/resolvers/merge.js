const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const transformEvent = async eventid => {
  const event = await Event.findById(eventid);
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event._doc.creator),
    date: new Date(event._doc.date).toISOString()
  };
};

const transformBooking = booking => {
  console.log('boooook---------', booking);
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

const events = async eventids => {
  try {
    const events = await Event.find({ _id: { $in: eventids } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (e) {
    throw e;
  }
};

exports.user = user;
exports.singleEvent = singleEvent;
exports.events = events;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
