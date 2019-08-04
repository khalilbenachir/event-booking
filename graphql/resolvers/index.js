const bcryptjs = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');


const events = eventids => {
    return Event.find({_id: {$in: eventids}})
        .then(
            events => {
                return events.map(event => {
                    return {
                        ...event._doc,
                        _id: event.id,
                        creator: user.bind(this, event.creator),
                        date: new Date(event._doc.date).toISOString()

                    }
                });
            }
        )
        .catch(err => {
            throw err;
        })
}

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {
                ...user._doc,
                _id: user.id,
                createEvents: events.bind(this, user.createdEvents),

            }
        })
        .catch(err => {
            throw  err;
        });
};


module.exports = {
    events: () => {
        return Event
            .find()
            .then((events) => {
                return events.map((event) => {
                    return {
                        ...event._doc,
                        _id: event.id,
                        creator: user.bind(this, event._doc.creator),
                        date: new Date(event._doc.date).toISOString()

                    }
                });
            })
            .catch((err) => console.log(err));
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d461ead32ccaa67f52f2128'
        });
        let createdEvent;
        event
            .save()
            .then((result) => {
                console.log(result);
                createdEvent = {
                    ...result._doc,
                    _id: result.id,
                    creator: user.bind(this, result._doc.creator),
                    date: new Date(result._doc.date).toISOString()
                };
                return User.findById('5d461ead32ccaa67f52f2128');
            }).then(user => {
            if (!user)
                throw new Error('user not found');
            user.createdEvents.push(event);
            return user.save();
        }).then((result) => {
            return createdEvent;
        })
            .catch((e) => {
                console.log(e);
                throw e;
            });
        return event;
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email}).then(user => {
            if (user) {
                throw new Error("Already exist one");
            }
            return bcryptjs
                .hash(args.userInput.password, 12)
        }).then((hashedPassword) => {
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            return user.save();
        }).then((result) => {
            console.log(result);
            return {...result._doc, password: null, _id: result.id};
        })
            .catch((error) => {
                throw error;
            });
    }
};