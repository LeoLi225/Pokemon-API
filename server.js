const { profileEnd } = require('console');
const { prototype } = require('events');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');
const bodyparser = require("body-parser");

const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://Leo:Lcyang0319.@cluster0.lbozp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });
const timelineSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
});
const timelineModel = mongoose.model("timelines", timelineSchema);

app.get('/timeline/getAllEvents', function (req, res) {
    timelineModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

const pokemonSchema = new mongoose.Schema({
    id: Number,
    name: String
});
const pokemonModel = mongoose.model("pokemons", pokemonSchema);

app.get('/pokemon/:id', function (req, res) {
    pokemonModel.find({
        id: req.params.id,

    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data[0]);
    });
})

app.put('/timeline/insert', function (req, res) {
    console.log(req.body)
    timelineModel.create({
        'text': req.body.text,
        'time': req.body.time,
        'hits': req.body.hits
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Insertion is successful!");
    });
})

app.get('/timeline/inscreaseHits/:id', function (req, res) {
    // console.log(req.body)
    timelineModel.updateOne({
        '_id': req.params.id
    },{
        $inc: {'hits': 1}
    } ,function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Update request is successful!");
    });
})

app.get('/timeline/delete/:id', function (req, res) {
    // console.log(req.body)
    timelineModel.remove({
        '_id': req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete request is successful!");
    });
})




app.listen(process.env.PORT || 5000, function (err){
    if (err) 
        console.log(err);
})


app.get('/profile/:id', function (req, res) {

    const url =`http:/localhost:5000/pokemon/${req.params.id}`

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
            });
        })

    });

})

app.use(express.static('./public'));

