const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');


const mongoose = require('mongoose');

const graphQlShema=require('./graphql/schema/index');
const graphqlResolver=require('./graphql/resolvers/index');

const isAuth=require('./middleware/is-auth');
const cors =require('cors');

const app = express();

app.use(cors({
    origin: '*', // Be sure to switch to your production domain
 optionsSuccessStatus: 200
}));




app.use(bodyParser.json());


/*
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST.GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS'){
        res.sendStatus(200);
        next();
    }
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
*/
app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlShema,
    rootValue:graphqlResolver ,
    graphiql: true
}));


mongoose.connect(`mongodb+srv://benachir:anahowa12@cluster0-ijowc.mongodb.net/event-booking?retryWrites=true&w=majority`,{ useNewUrlParser: true })
    .then(() => {
        console.log('connected');
        app.listen(8000,()=>console.log('server on 8000'));
    }).catch((err) => {
    console.log(err);
});


