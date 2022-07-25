const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./graphql");
const app = require("./express");

const main = () => {
  app.use(cors());
  // mongoose.connect("mongodb://localhost:27017/lorenzo"); //local connection
  mongoose.connect(
    "mongodb+srv://sanc7us:sanc7us@cluster0.pznoptk.mongodb.net/petgram?retryWrites=true&w=majority"
  );
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(4000, () => {
    console.log("Listening on port 4000");
  });
};

main();
