const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
const mongoose = require('mongoose');
const { profileEnd } = require('console');
const { prototype } = require('events');
app.set('view engine', 'ejs');
const https = require('https');
const bcrypt = require('bcrypt')


var session = require('express-session')

app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}))

users = {
    "user1": "pass1",
    "user2": "pass2",
}

const port = process.env.PORT || 5000;
app.listen(port, function (err) {
    if (err) console.log(err)
})

mongoose.connect("mongodb+srv://Leo:Lcyang0319.@cluster0.lbozp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });
const accountSchema = new mongoose.Schema({
    user: String,
    pass: String,
    cart: [],
    orders: [],
    timelines: [],
    game: []
});
const accountModel = mongoose.model("accounts", accountSchema);

app.get('/cart/getAllEvents', function (req, res) {
    accountModel.find({
        user: req.session.user,
        pass: req.session.pass
    },
    function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });


})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/pages/index.html")

})

app.get('/login', function (req, res) {
    if(req.session.authenticated)
        res.sendFile(__dirname + "/public/pages/profile.html")
    else {
        res.sendFile(__dirname + "/public/pages/login.html")
    }

})

app.get('/cart', function (req, res) {
    if(req.session.authenticated)
        res.sendFile(__dirname + "/public/pages/cart.html")
    else {
        res.send(null);
    }

})

app.get('/game', function (req, res) {
    if(req.session.authenticated)
        res.sendFile(__dirname + "/public/pages/game.html")
    else {
        res.send(null);
    }

})

app.get('/login/:user/:pass', function (req, res) {
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

app.get('/account', function (req, res) {
    accountModel.findOne({user: req.session.user, pass: req.session.pass}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

app.put('/game/insert/:grid/:level/:pokenum/:result/:time', function (req, res) {
    if(req.session.authenticated) {
        accountModel.updateOne({
                user: req.session.user,
                pass: req.session.pass
            }, {
                $push: {
                    game: {
                        grid: req.params.grid,
                        level: req.params.level,
                        pokenum: req.params.pokenum,
                        result: req.params.result,
                        time: req.params.time
                    }
                }
            },
            function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Data " + data);
                }
                res.send("Game insertion is successful!");
            });
    } else {
        res.send(null);
    }
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

app.get('/logout', function (req, res) {
    req.session.authenticated = false;
    res.send("Logout succeeded");
})

app.get('/cart/insert/:id', function (req, res) {
    if(req.session.authenticated) {
        accountModel.updateOne({
                user: req.session.user,
                pass: req.session.pass
            }, {
                $push: {
                    cart: {
                        id: req.params.id,
                        cost: 200,
                        count: 1
                    }
                }
            },
            function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Data " + data);
                }
                res.send("Insertion is successful!");
            });
    } else {
        res.send(null);
    }

})

app.get('/checkout/:id', function (req, res) {
    accountModel.updateOne({
            user: req.session.user,
            pass: req.session.pass
        }, {
            $push: {
                orders: {
                    id: req.params.id,
                    cost: 200,
                    count: 1
                }
            }
        },
        function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Data " + data);
            }
            res.send("Orders insertion is successful!");
        });
})



app.get('/delete/:id', function (req, res) {
    // console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $pull: {
            cart: {
                id: req.params.id,
            }
        } },
    function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete request is successful!");
    });
})

app.get('/deleteOrder/:id', function (req, res) {
    // console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $pull: {
            orders: {
                id: req.params.id,
            }
        } },
    function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete request is successful!");
    });
})

app.get('/timeline/insert/:type/:time', function (req, res) {
    console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $push: {
            timelines: {
                text: `User has searched ${req.params.type} type`,
                time: req.params.time,
            }
        }
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Insertion is successful!");
    });
})

app.get('/addcard/:name/:time', function (req, res) {
    console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $push: {
            timelines: {
                text: `User has clicked ${req.params.name} card`,
                time: req.params.time,
            }
        }
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Insertion is successful!");
    });
})

app.get('/timeline/delete/:id', function (req, res) {
    // console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $pull: {
            timelines: {
                text: req.params.id
            }
        }
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete request is successful!");
    });
})

app.get('/game/delete/:id', function (req, res) {
    // console.log(req.body)
    accountModel.updateOne({
        user: req.session.user,
        pass: req.session.pass
    }, {
        $pull: {
            game: {
                time: req.params.id
            }
        }
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete request is successful!");
    });
})



app.get('/profile/:id', function (req, res) {

    const url =`https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    data = ""
    https.get(url, function(https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            hp = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            attack = data.stats.filter((obj_) => {
                return obj_.stat.name == "attack"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            defense = data.stats.filter((obj_) => {
                return obj_.stat.name == "defense"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            special_attack = data.stats.filter((obj_) => {
                return obj_.stat.name == "special-attack"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            speed = data.stats.filter((obj_) => {
                return obj_.stat.name == "speed"
            }).map((obj2)=>{
                return obj2.base_stat
            })

            const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": upperCaseName,
                "hp": hp[0],
                "attack": attack,
                "defense": defense,
                "special_attack": special_attack,
                "speed": speed,
                "stock": req.params.id * 10
            });
        })

    });

})

app.use(express.static('./public'));