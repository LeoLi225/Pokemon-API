string = ''
length = 0
a = 0
$(document).ready(function () {
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('keyup', (e) => {
        const value = e.target.value
        string = value
        length = value.length
        console.log(value)
        checkloop = 0
        if (value == '') {
            send()
        } else if(isNaN(value) == false) {
            $("main").empty()
            $("main").append(`<h1>Please enter correct Pokemon name!</h1>`)

        } else if (value == 'pikaa' || value == 'as') {
            $("main").empty()
            $("main").append(`<h1>No such Pokemon in here</h1>`)
        } else {
            $("main").empty()
            load()
        }
    })
})

function load() {
    count = 0;
    for (i = 1; i < 30; i++) {
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: process
        })
    }

}

function history() {
    $('.history').append(
            `<div>
                <a href="../profile/25">Pikachu</a>
            </div>`
        )
}

function process(data) {
    counter = 0
    for (a = 0; a < length; a++) {
        if (data.name[a] == string[a]) {
            counter++;
        }
    }
    if(counter == length) {
        count++;
        checkloop++;
    }
    if(counter == length && count <= 9) {
        if (count % 3 == 1) { // only when i= 1, 4, 7
            $("main").append(`<text${loop} class="images_group">`)
        }

        const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
        $("text" + loop).append(`
        <div class="image_container" id="${data.id}">
            <a href="/profile/${data.id}" id="${data.id * 3.5}" class="card">
            <img src="${data.sprites.other["official-artwork"].front_default}">
            </a>
            <div> Id: ${data.id} </div>
            <div> Name: ${upperCaseName} </div>
            <button id="${data.id * 10}" class="cart"><span class="material-icons">Add to cart</span></button>
        </div>`)

        if (count % 3 == 0) { // only when i= 3, 6, 9
            $("main").append(`</text${loop}>`)
            loop++;
        }

    }

}

to_add = ''

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eceda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

function processPokeResp(data) {
    const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
    to_add += `
    <div class="image_container">
        <a href="/profile/${data.id}" id="${data.id * 3.5}" class="card">
        <img src="${data.sprites.other["official-artwork"].front_default}">
        </a>
        <div> Id: ${data.id} </div>
        <div> Name: ${upperCaseName} </div>
        <button id="${data.id * 10}" class="cart"><span class="material-icons">Add to cart</span></button>
    </div>`
}

orderNum = 0;
randomNum = 0;

async function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) { // only when i= 1, 4, 7
            to_add += `<div class="images_group">`
        }

        if (orderNum == 0) {
            randomNum = Math.floor(Math.random() * 898) + 1
        } else if(orderNum == 1) {
            randomNum = Math.floor(Math.random() * 200) + 1
        } else if (orderNum == 2) {
            randomNum = Math.floor(Math.random() * 200) + 201
        } else if(orderNum == 3) {
            randomNum = Math.floor(Math.random() * 200) + 401
        } else if(orderNum == 4) {
            randomNum = Math.floor(Math.random() * 298) + 601
        }


        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${randomNum}/`,
            success: processPokeResp
        })

        if (i % 3 == 0) { // only when i= 3, 6, 9
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)

}

type_g = ''
order = '0'
count = 0;
loop = 0;
a = 0;
b = 9;
function processPokeResponse(data) {
    for (i = 0; i < data.types.length; i++) {
        if (data.types[i].type.name == type_g) {
            count += 1;
        }
        if (data.types[i].type.name == type_g && count <= b && count > a) {

            if (count % 3 == 1) { // only when i= 1, 4, 7
                $("main").append(`<text${loop} class="images_group">`)
            }

            const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
            $("text" + loop).append(`
            <div class="image_container" id="${data.id}">
                <a href="/profile/${data.id}"  id="${data.id * 3.5}" class="card">
                <img src="${data.sprites.other["official-artwork"].front_default}">
                </a>
                <div> Id: ${data.id} </div>
                <div> Name: ${upperCaseName} </div>
                <button id="${data.id * 10}" class="cart"><span class="material-icons">Add to cart</span></button>
            </div>`)

            if (count % 3 == 0) { // only when i= 3, 6, 9
                $("main").append(`</text${loop}>`)
                loop++;
            }
        }
        // if (type_g == 'grass') {
        //     document.getElementById(data.id).style.backgroundColor = '#DEFDE0';
        // } else if (type_g == 'electric') {
        //     document.getElementById(data.id).style.backgroundColor = colors.electric;
        // } else if (type_g == 'water') {
        //     document.getElementById(data.id).style.backgroundColor = colors.water;
        // } else if (type_g == 'bug') {
        //     document.getElementById(data.id).style.backgroundColor = colors.bug;
        // } else {
        //     document.getElementById(data.id).style.backgroundColor = colors.fire;
        // }
    }

}

start = 0;
end = 0;

function loadNew() {
    count = 0;
    for (i = start; i <= end; i++) {
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokeResponse
        })
    }
}



function display(type_) {
    $("main").empty()
    type_g = type_
    to_add = ''
    if (type_g == "random") {
        loadNineImages();
    } else {
        a = 0;
        b = 9;
        loadNew();
    }

}

function send() {
    $("main").empty()
    to_add = ''
    if (type_g == '' || type_g == 'random') {
        loadNineImages();
    } else {
        a += 9;
        b += 9;
        loadNew();
    }
}

var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

function addNewEvent(poke_type) {
    $.ajax({
        url: `http://localhost:5000/timeline/insert/${poke_type}/${formatted}`,
        type: "get",
        success: (res) => {
            console.log(res)
        }
    })
}

function addcart() {
    x = this.id / 10;
    console.log(x);
    $.ajax({
        url: `http://localhost:5000/cart/insert/${x}`,
        type: "get",
        success: function (a) {
            if(a) {
                window.alert(`Id: ${x} card was successfully added to your cart`);
            } else {
                window.alert(`Please click 'Account' to login before add to cart`);
            }
        }
    })

}

function addtotimelines() {
    x = this.id / 3.5;
    console.log(x);
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${x}`,
        type: "get",
        success: function (data) {
            const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
            $.ajax({
                url: `http://localhost:5000/addcard/${upperCaseName}/${formatted}`,
                type: "get",
                success: function (a) {
                    console.log(a);
                }
            })
        }
    })
}


function setup() {

    display($("#poke_type option:selected").val());

    $("#poke_type").change(() => {
        // alert($(this).attr("value"));
        poke_type = $("#poke_type option:selected").val();
        display(poke_type);
        addNewEvent(poke_type)
    })
    $("body").on("click", ".cart", addcart)
    $("body").on("click", ".card", addtotimelines)
}

function setid() {

    displayid($("#poke_id option:selected").val());

    $("#poke_id").change(() => {
        // alert($(this).attr("value"));
        poke_id = $("#poke_id option:selected").val();
        displayid(poke_id);
    })
}

function displayid(order_) {
    order = order_
    if (order == '0') {
        orderNum = 0
        start = 1;
        end = 898

    } else if(order == '1') {
        start = 1;
        end = 200
        orderNum = 1
        a = 0
        b = 9
        send()

    } else if(order == '2') {
        start = 201;
        end = 400
        orderNum = 2
        a = 0
        b = 9
        send()

    } else if(order == '3') {
        start = 401;
        end = 600
        orderNum = 3
        a = 0
        b = 9
        send()

    } else if(order == '4') {
        start = 601;
        end = 898
        orderNum = 4
        a = 0
        b = 9
        send()
    }
}

function Gologin() {
    window.location.href = 'http://localhost:5000/login';
}

function Gocart() {
    $.ajax({
        url: `http://localhost:5000/cart`,
        type: "get",
        success: function (a) {
            if(a) {
                window.location.href = 'http://localhost:5000/pages/cart.html';
            } else {
                window.alert(`Please click 'Account' to login before check your cart`);
            }
        }
    })
}

function Gogame() {
    $.ajax({
        url: `http://localhost:5000/game`,
        type: "get",
        success: function (a) {
            if(a) {
                window.location.href = 'http://localhost:5000/pages/game.html';
            } else {
                window.alert(`Please 'Login' first, otherwise your data will not be recorded`);
                window.location.href = 'http://localhost:5000/pages/game.html';
            }
        }
    })
}


$(document).ready(setid)
$(document).ready(setup)





