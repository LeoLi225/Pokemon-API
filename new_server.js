const { profileEnd } = require('console');
const { prototype } = require('events');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');
const bodyparser = require("body-parser");

var session = require('express-session')

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://Leo:Lcyang0319.@cluster0.lbozp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });

// const timelineSchema = new mongoose.Schema({
//     text: String,
//     hits: Number,
//     time: String
// });

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    shoppingCart: [],
    orders: []
});
const accountModel = mongoose.model("accounts", accountSchema);

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart: [
            {
                pokeID: 25,
                price: 13,
                quantity: 2
            }, {

                pokeID: 35,
                price: 40,
                quantity: 5
            }
        ]

    }, {

        username: "user2",
        password: "pass2"
    }
]

function logger1(x, y, next) {
    console.log("logger1 function got executed!")
    next()
}

function logger2(x, y, next) {
    console.log("logger2 function got executed!")
    next()
}

function logger3(x, y, next) {
    console.log("logger3 function got executed!")
    next()
}
function auth(req, res, next) {
    if (req.session.authenticated) {
        next()
        console.log("dsaasd")
    }
    else {
        res.redirect('/login')
    }

}
// how you declarea a global middleware
app.use(logger1)
app.use(logger2)

// app.listen(5000, function (err) {
//     if (err) console.log(err);
// })

app.get('/', auth, function (req, res) {
    console.log("/ home route got triggerd!")
    tmp = ''
    tmp += `Hi ${req.session.user} !`
    tmp += "Welcome to the home page"
    res.send(tmp)
})

app.get('/userProfile/:x', auth, function (req, res) {
    tmp = ''
    tmp += `Hi ${req.params.x} !`
    tmp += JSON.stringify(users.filter(user => user.username == req.params.x)[0].shoppingCart)
    res.send(tmp)

})



app.get('/login', logger3, function (req, res, next) {
    console.log("the callback function of /login")
    // res.send("Please provide the credentials through the URL")
    res.sendFile(__dirname + "/public/login.html")
})

app.get('/login/:user/:pass', function (req, res, next) {
    let username = req.params.user;
	let password = req.params.pass;
    accountModel.findOne({user: username, pass: password}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        if (data) {
            req.session.authenticated = true;
            req.session.user = username;
            req.session.pass = password;
        }
        res.send(data);
    });

})

app.put('/create/:user/:pass', function (req, res) {
    console.log(req.params.user);
    let username = req.params.user;
	let password = req.params.pass;
    console.log(username, password);
    accountModel.findOne({
        user: username,
        pass: password
    }, function (err, data) {
        if (data) {
            res.send(null);
        } else {
            accountModel.create({
                user: username,
                pass: password,
                shoppingCart: [],
                orders: []
            }, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Data " + data);
                }
                res.send(data);
            });
        };
    });
})


// app.get('/timeline/getAllEvents', function (req, res) {
//     timelineModel.find({}, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data);
//     });
// })

// const pokemonSchema = new mongoose.Schema({
//     id: Number,
//     name: String
// });
// const pokemonModel = mongoose.model("pokemons", pokemonSchema);

// app.get('/pokemon/:id', function (req, res) {
//     pokemonModel.find({
//         id: req.params.id,

//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data[0]);
//     });
// })

// app.put('/timeline/insert', function (req, res) {
//     console.log(req.body)
//     timelineModel.create({
//         'text': req.body.text,
//         'time': req.body.time,
//         'hits': req.body.hits
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Insertion is successful!");
//     });
// })

// app.get('/timeline/inscreaseHits/:id', function (req, res) {
//     // console.log(req.body)
//     timelineModel.updateOne({
//         '_id': req.params.id
//     }, {
//         $inc: { 'hits': 1 }
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Update request is successful!");
//     });
// })

// app.get('/timeline/delete/:id', function (req, res) {
//     // console.log(req.body)
//     timelineModel.remove({
//         '_id': req.params.id
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Delete request is successful!");
//     });
// })




// app.get('/profile/:id', function (req, res) {

//     const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

//     data = ""
//     https.get(url, function (https_res) {
//         https_res.on("data", function (chunk) {
//             data += chunk
//         })

//         https_res.on("end", function () {
//             data = JSON.parse(data)

//             hp = data.stats.filter((obj_) => {
//                 return obj_.stat.name == "hp"
//             }).map((obj2) => {
//                 return obj2.base_stat
//             })

//             attack = data.stats.filter((obj_) => {
//                 return obj_.stat.name == "attack"
//             }).map((obj2) => {
//                 return obj2.base_stat
//             })

//             defense = data.stats.filter((obj_) => {
//                 return obj_.stat.name == "defense"
//             }).map((obj2) => {
//                 return obj2.base_stat
//             })

//             special_attack = data.stats.filter((obj_) => {
//                 return obj_.stat.name == "special-attack"
//             }).map((obj2) => {
//                 return obj2.base_stat
//             })

//             speed = data.stats.filter((obj_) => {
//                 return obj_.stat.name == "speed"
//             }).map((obj2) => {
//                 return obj2.base_stat
//             })

//             const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
//             res.render("profile.ejs", {
//                 "id": req.params.id,
//                 "name": upperCaseName,
//                 "hp": hp[0],
//                 "attack": attack,
//                 "defense": defense,
//                 "special_attack": special_attack,
//                 "speed": speed,
//             });
//         })

//     });

// })

app.use(express.static('./public'));

