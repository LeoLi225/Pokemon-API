$("#back").click(function () {

    window.location.href = 'http://localhost:5000';

})

grid = 'low'
level = 'easy'
pokenum = 'max'
to_add = ''
sel_add = ''
a = 0;
b = 0;
total = 0;
loop = 0
list = []
time = 30;
result = ''
counter = 1


function processPokeResp(data) {
    to_add += `
    <div class="card" onclick="setup1()">
        <img id="img${loop}" class="front_face" src="${data.sprites.other["official-artwork"].front_default}" alt="">
        <img  class="back_face" src="../images/back.png" alt="">
    </div>`
}

function listnum() {
    needNum = a * b / 2
    num = 0
    if (pokenum == 'max') {
        num = needNum
    } else {
        num = parseInt(pokenum)
    }
    for (i = 1; i <= num; i++) {
        randomNum = Math.floor(Math.random() * 898)
        list.push(randomNum)
    }
    repeatcardnum = needNum - num
    if (repeatcardnum > 0) {
        for (i = 1; i <= repeatcardnum; i++) {
            list.push(list[Math.floor(Math.random() * num)])
        }
    }

    for (i = 0; i < needNum; i++) {
            list.push(list[i])
        }

}

function shuffle(list_) {
    var array = list_;
    var m = array.length,
    t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

async function loadgame() {
    total = a * b;
    loop = 0
    list = [];
    listnum();
    array = shuffle(list)
    // console.log(array)
    for (i = 1; i <= total; i++) {
        loop = i
        if (i == 1) {
            to_add += `<div id="game_grid">`
        }
        if (i % b == 1) {
            to_add += `<div class="ggrid">`
        }
        await $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${array[i - 1]}`,
            success: processPokeResp
        })

        if (i % b == 0) {
            to_add += `</div>`
        }
        if (i == total) {
            to_add += `</div">`
        }
    }

    jQuery("main").html(to_add)
}

function display(type_) {
    $("main").empty()
    to_add = ''
    if (type_ == "low") {
        a = 2;
        b = 4;
        loadgame();
    } else if(type_ == "mid") {
        a = 4;
        b = 4;
        loadgame();
    } else {
        a = 6;
        b = 4;
        loadgame();
    }
}


function setgame() {
    $.ajax({
        url: `http://localhost:5000/game/insert/${grid}/${level}/${pokenum}/${result}/${formatted}`,
        type: "put",
        success: (res) => {
            console.log(res)
        }
    })
}

function settime() {
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          document.getElementById("timer").innerHTML = "Lose";
          result = "Lose"
          setgame();
        } else {
          document.getElementById("timer").innerHTML = timeleft;
        }

        if ((pairsFound * 2 == list.length) && timeleft > 0 && counter == 1) {
            document.getElementById("timer").innerHTML = "Win"
            result = "Win"
            counter++
            setgame()
            clearInterval(downloadTimer)

        } else {
           timeleft -= 1;
        }

      }, 1000);
}

function startgame() {
    console.log(grid)
    console.log(level)
    console.log(pokenum)
    var now = new Date(Date.now());
    var format = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    formatted = format
    counter = 1
    $("#timer").empty()
    timeleft = time
    pairsFound = 0

    display(grid)
    settime(timeleft)


}

function display2(data) {
    if (data == 'low') {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    } else if (data == 'mid') {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    } else {
        $("#pokenum_type").empty()
        sel_add = ''
        sel_add += `
            <option value="max">max</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
        `
        jQuery("#pokenum_type").html(sel_add)
    }
}

function display3() {
    if (grid == 'low' && level == 'easy') {
        time = 30
    } else if (grid == 'low' && level == 'medium') {
        time = 20
    } else if (grid == 'low' && level == 'hard') {
        time = 10
    } else if (grid == 'mid' && level == 'easy') {
        time = 40
    } else if (grid == 'mid' && level == 'medium') {
        time = 30
    } else if (grid == 'mid' && level == 'hard') {
        time = 20
    } else if (grid == 'high' && level == 'easy') {
        time = 60
    } else if (grid == 'high' && level == 'medium') {
        time = 45
    } else {
        time = 30
    }
}

function setup() {
    $("#grid_type").change(() => {
        // alert($(this).attr("value"));
        grid = $("#grid_type option:selected").val();
        display2(grid)
        display3()
    })

    $("#level_type").change(() => {
        // alert($(this).attr("value"));
        level = $("#level_type option:selected").val();
        display3()
    })


    $("#pokenum_type").change(() => {
        // alert($(this).attr("value"));
        pokenum = $("#pokenum_type option:selected").val();
    })
}



$(document).ready(setup)

// $(document).ready(startgame)

