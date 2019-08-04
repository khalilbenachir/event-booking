const bcryptjs = require('bcryptjs');


const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');


const events = async eventids => {
    try {


        const events = await Event.find({_id: {$in: eventids}});

        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                creator: user.bind(this, event.creator),
                date: new Date(event._doc.date).toISOString()

            }
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
            createEvents: events.bind(this, user.createdEvents),

        }

    } catch (err) {
        throw  err;
    }
    ;

};


const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this, event.creator),
        }

    } catch (e) {
        console.log('-------------');
        throw e;
    }
};

module.exports = {
    events: async () => {
        try {


            const events = await Event.find();

            return events.map((event) => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event._doc.creator),
                    date: new Date(event._doc.date).toISOString()

                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                }
            })

        } catch (e) {
            throw e;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d461ead32ccaa67f52f2128'
        });
        let createdEvent;
        try {


            const result = await event.save();
            console.log(result);
            createdEvent = {
                ...result._doc,
                _id: result.id,
                creator: user.bind(this, result._doc.creator),
                date: new Date(result._doc.date).toISOString()
            };
            const user = await User.findById('5d461ead32ccaa67f52f2128');

            if (!user)
                throw new Error('user not found');
            user.createdEvents.push(event);
            await user.save();
            return createdEvent;
        } catch (e) {
            console.log(e);
            throw e;
        }
        ;
    },
    createUser: async (args) => {
        try {
            const user = await User.findOne({email: args.userInput.email});
            if (user) {
                throw new Error("Already exist one");
            }
            const hashedPassword = await bcryptjs.hash(args.userInput.password, 12);
            const userCreated = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await userCreated.save();
            console.log(result);
            return {...result._doc, password: null, _id: result.id};
        } catch
            (error) {
            throw error;
        }
        ;
    },
    bookEvent: async (args) => {
        const fitchedEvent = await Booking.findOne({_id: args.eventId});
        const booking = await new Booking({
            event: fitchedEvent,
            user: '5d461ead32ccaa67f52f2128'
        });

        const result = await booking.save();
        return {
            ...result._doc,
            _id: result.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString(),

        }
    },
    cancelBooking:async args=>{
        try {
            const booking=await Booking.findById(args.bookId);
            const event={
                ...booking.event._doc,_id:booking.event._doc.id,creator:user.bind(this,booking.event._doc.creator)
            };

            await booking.deleteOne({_id:args.bookId});
            return event;

        }catch (e) {
            throw e;
        }
    }
};