$("#back").click(function () {

    window.location.href = 'http://localhost:5000';

})

grid = 'low'
level = 'easy'
to_add = ''
a = 0;
b = 0;
total = 0;
loop = 0
list = []


function processPokeResp(data) {
    to_add += `
    <div class="card" onclick="setup1()">
        <img id="img${loop}" class="front_face" src="${data.sprites.other["official-artwork"].front_default}" alt="">
        <img  class="back_face" src="../images/back.png" alt="">
    </div>`
}

function listnum() {
    needNum = a * b / 2
    for (i = 1; i <= needNum; i++) {
        randomNum = Math.floor(Math.random() * 898)
        list.push(randomNum)
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
    // $("main").empty()
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

function startgame() {
    console.log(grid)
    console.log(level)
    display(grid)

}

function setup() {
    $("#grid_type").change(() => {
        // alert($(this).attr("value"));
        grid = $("#grid_type option:selected").val();
    })

    $("#level_type").change(() => {
        // alert($(this).attr("value"));
        level = $("#level_type option:selected").val();
    })
}



$(document).ready(setup)

// $(document).ready(startgame)

