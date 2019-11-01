'use strict'
const express = require('express'),
      path = require('path'),
      exphbs = require('express-handlebars'),
      methodOverride = require('method-override'),
      session = require('express-session'),
      flash = require('connect-flash'),
      passport = require('passport');


// // Initializations
const app = express();
require('./database');

// // settings
app
    .set('port', process.env.PORT || 3000)
    .set('views',path.join(__dirname,'views'))
    .set('view engine', '.hbs');

app
    .engine('.hbs',exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'),'partials'),
        extname: '.hbs'
    }));

// // Middlewares
app
    .use(express.urlencoded({extended: false}))
    .use(methodOverride('_method'))
    .use(session({
        secret: 'mysecretapp',
        resave: true,
        saveUninitialized: true
    }))
    .use(flash());

// // Globals variables
app
    .use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });


// // Routes
const r_index = require('./routes/r_index'),
      r_user = require('./routes/r_users'),
      r_note = require('./routes/r_notes');

app
    .use(r_index)
    .use('/user',r_user)
    .use('/notes',r_note);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
  