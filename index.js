const express = require('express');
const mongoose=require('mongoose');
//give access to cookies
const cookieSession=require('cookie-session');
//tell passport to make use of cookies
const passport=require('passport');
const bodyParser=require('body-parser');
const keys=require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

/*
const run = async () => {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  };

run().catch(error => console.error(error));
*/

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){

    //Express will serve up production assets (FILES!!!!! main.js, main.css)
    app.use(express.static('client/build'));

    /*Express will serve up index html if doesn't recognize the file. It is decided by operation order.. Is there a file? Is there a routeHandler? Ok then handle the index.html*/

    const path = require('path');
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



const PORT = process.env.PORT || 5000;
app.listen(PORT);