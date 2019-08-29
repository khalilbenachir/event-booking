const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent,events, user,transformBooking,singleEvent} =require('./merge')

module.exports = {
    events: async () => {
        try {

            const events = await Event.find();

            return events.map((event) => {
                return transformEvent(event);
            })
        } catch (err) {
            console.log(err);
        }
    },
    
    createEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error("unAuthorized");
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d5e9586ee74984415e22288'
        });
        let createdEvent;
        try {


            const result = await event.save();
            createdEvent = transformEvent(result);
            const user = await User.findById(req.userId);

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
    }
};