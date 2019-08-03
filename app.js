const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql')
const {buildSchema} = require('graphql')


const mongoose = require('mongoose');


const Event = require('./event');

const app = express();

app.use(bodyParser.json());


app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id:ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        input EventInput{
            title:String!
            description:String!
            price:Float!
            date:String!
        }


        type RootQuery {
            events:[Event!]!
        }

        type RootMutation {
            createEvent(eventInput:EventInput):Event
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event
                .find()
                .then((events) => {
                    return events.map((event) => {
                        return {...event._doc}
                    });
                })
                .catch((err) => console.log(err));
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            event
                .save()
                .then((result) => {
                    console.log(result);
                    return {...result._doc};
                })
                .catch((e) => {
                    console.log(e);
                    throw e;
                });
            return event;
        }
    },
    graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ijowc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('connected');
        app.listen(3000);
    }).catch((err) => {
    console.log(err);
});


