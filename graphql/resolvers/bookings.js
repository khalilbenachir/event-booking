const Booking = require('../../models/booking');
const Event =require('../../models/event');
const { transformEvent,events, user,transformBooking,singleEvent} =require('./merge')



module.exports = {  
    bookings: async (args,req) => {
        if(!req.isAuth){
            throw new Error("unAuthorized");
        }
        try {
            const bookings = await Booking.find();

            return bookings.map(booking => {
                return transformBooking(booking);
            })

        } catch (e) {
            throw e;
        }
    },
    bookEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("unAuthorized");
        }
        const fitchedEvent = await Event.findOne({_id: args.eventId});
        const booking = await new Booking({
            event: fitchedEvent,
            user: req.userId
        });

        const result = await booking.save();
        console.log(result,"----------bookevent");
        return transformBooking(result);
    },
    cancelBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error("unAuthorized");
        }
        try {
            const booking = await Booking.findById(args.bookId);
            console.log('====================================');
            console.log(booking.event);
            console.log('====================================');
            const event = await transformEvent(booking.event);
            await Booking.deleteOne({_id:args.bookId});
            console.log("-------"+event.date);
            return event;

        } catch (e) {
            throw e;
        }
    }
};