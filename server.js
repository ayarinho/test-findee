const express = require('express'); 
const bodyParser = require('body-parser')
const { connect } = require('mongoose');
const { success, error } = require('consola');

require("dotenv").config({ path: './config/.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

var jsonParser = bodyParser.json();

// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }))
//use router middelware

app.use('/test', jsonParser, require('./routes/user.routes'));


const startApp = async () => {
     try {
          // Connection With DB
          await connect(process.env.APP_DB, {
               useFindAndModify: true,
               useUnifiedTopology: true,
               useNewUrlParser: true
          });

          success({
               message: `Successfully connected with the Database \n${process.env.APP_DB}`,
               badge: true
          });

          // Start Listenting for the server on PORT
          app.listen(process.env.PORT, () =>
               success({ message: `Server started on PORT ${process.env.PORT}`, badge: true })
          );
     } catch (err) {
          error({
               message: `Unable to connect with Database \n${err}`,
               badge: true
          });
          startApp();
     }
};

startApp();




