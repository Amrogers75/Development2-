var Socks = require('./models/socks');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all socks
    app.get('/api/socks', function(req, res) {
        console.log('sending a find all todo list request to the todo repo  ');

        // use mongoose to get all socks in the database
        Socks.find(function(err, socks) {
            console.log('error :'+ err + ' todo' + socks);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            {
                res.send(err)
            }

            res.json(socks); // return all socks in JSON format
        });
    });

    passport.use(new FacebookStrategy({
            clientID: "334240753609992",
            clientSecret: "11f296259b5c3cbc96d00f0cd52891c2",
            callbackURL: "http://localhost:8090/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            cb(null, profile);
        }
    ));

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/#/store',
            failureRedirect: '/#/login' }));

    app.get("/user/me", function(req, res){
       res.json(req.user);
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    // create todo and send back all socks after creation
    // app.post('/api/socks', function(req, res) {
    //
    //     // create a todo, information comes from AJAX request from Angular
    //     Socks.create({
    //         text : req.body.text,
    //         done : false
    //     }, function(err, todo) {
    //         if (err)
    //             res.send(err);
    //
    //         // get and return all the socks after you create another
    //         Socks.find(function(err, socks) {
    //             if (err)
    //                 res.send(err)
    //             res.json(socks);
    //         });
    //     });
    //
    // });

    // delete a todo
    // app.delete('/api/socks/:todo_id', function(req, res) {
    //     Socks.remove({
    //         _id : req.params.todo_id
    //     }, function(err, todo) {
    //         if (err)
    //             res.send(err);
    //
    //         // get and return all the socks after you create another
    //         Socks.find(function(err, socks) {
    //             if (err)
    //                 res.send(err)
    //             res.json(socks);
    //         });
    //     });
    // });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
    );


};

