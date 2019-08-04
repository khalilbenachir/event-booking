const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');


const mongoose = require('mongoose');

const graphQlShema=require('./graphql/schema/index');
const graphqlResolver=require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());



app.use('/graphql', graphqlHttp({
    schema: graphQlShema,
    rootValue:graphqlResolver ,
    graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ijowc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('connected');
        app.listen(3000);
    }).catch((err) => {
    console.log(err);
});


