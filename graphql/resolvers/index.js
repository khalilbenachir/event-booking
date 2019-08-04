const bcryptjs = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');


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
    }
};