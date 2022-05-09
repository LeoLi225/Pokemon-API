const { profileEnd } = require('console');
const { prototype } = require('events');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');

app.listen(process.env.PORT || 5000, function (err){
    if (err) 
        console.log(err);
})

// app.listen(process.env.PORT || 5000);

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
            });
        })

    });

})

app.use(express.static('./public'));

