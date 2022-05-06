const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');

app.listen(5000, function (err){
    if (err) 
        console.log(err);
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

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": hp[0]
            });
        })

    });



})

app.use(express.static('./public'));

