const express = require("express");
const bodyParser = require("body-parser");

const graphqlHttp = require("express-graphql");

const mongoose = require("mongoose");
const bearerToken = require("express-bearer-token");

const graphQlShema = require("./graphql/schema/index");
const graphqlResolver = require("./graphql/resolvers/index");

const isAuth = require("./middleware/is-auth");
const cors = require("cors");

const app = express();

app.use(bearerToken());
app.use(
  cors({
    origin: "*", // Be sure to switch to your production domain
    optionsSuccessStatus: 200
  })
);

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlShema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://benachir:anahowa12@cluster0-ijowc.mongodb.net/event-booking?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected");
    app.listen(8000, () => console.log("server on 8000"));
  })
  .catch(err => {
    console.log(err);
  });
