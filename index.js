const nedb = require('nedb');
const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

const db = new nedb({ filename: 'usersTest.db', autoload: true });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/landingpage.html'));
});


app.get('/Login', function (req, res) {
    res.sendFile(path.join(__dirname, './public/Login.html'));
});

app.get('/SignUp', function (req, res) {
    res.sendFile(path.join(__dirname, './public/SignUp.html'));
});

app.get('/Home', function (req, res) {
    res.sendFile(path.join(__dirname, './public/Home.html'));
});

app.post('/register', async (req, res) => {
    var exists = new Boolean(false);
    var paSsword = String;
    var paSsword2 = String;

    db.find({ email: req.body.email }, function (err, docs) {
        if (err) {
            console.log('error');
        } else {
            console.log('documents retrieved ', docs);
        }

        console.log({ password: req.body.password })
        console.log({ password2: req.body.password2 })
        paSsword = req.body.password;
        paSsword2 = req.body.password2;

        //testing
        //console.log(paSsword, paSsword2, paSsword==paSsword2);

        if (paSsword == paSsword2) {

            try {
                if (docs == '') {
                    db.insert({
                        name: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        password2: req.body.password2,
                        birth_day: req.body.birthday_day,
                        birthday_month: req.body.birthday_month,
                        birthday_year: req.body.birthday_year
                    }, function (err, newDoc) {
                        if (err) {
                            console.log('error', err);
                        } else {
                            console.log('document inserted');

                        }
                    });
                } else {
                    console.log('user already exists');
                    return res.sendFile(path.join(__dirname, './public/UserExists.html'));
                }
                return res.redirect('/Home');

                console.log('User list', newUser);
            } catch {
                res.send("Internal server error");
            }

        } else {
            console.log('Passwords are not the same');
            return res.sendFile(path.join(__dirname, './public/Passworderror.html'));

        }
    });
});


app.listen(3000, () => {
    console.log("Server listening on port: 3000");
});
