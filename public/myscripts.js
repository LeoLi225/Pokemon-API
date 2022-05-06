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

function processPokeResp(data){
    const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
    to_add += `
    <div class="image_container">
        <a href="/profile/${data.id}">
        <img src="${data.sprites.other["official-artwork"].front_default}">
        </a>
        <div> Id: ${data.id} </div>
        <div> Name: ${upperCaseName} </div>
    </div>`
}



async function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) { // only when i= 1, 4, 7
            to_add += `<div class="images_group">`
        }

        x = Math.floor(Math.random() * 898) + 1

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokeResp
        })

        if (i % 3 == 0) { // only when i= 3, 6, 9
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)

}

type_g = ''
count = 0;
loop = 0;
function processPokeResponse(data){
    for (i = 0; i < data.types.length ; i++){
        if (data.types[i].type.name == type_g && count < 9) {
            count += 1;

            if (count % 3 == 1) { // only when i= 1, 4, 7
                $("main").append( `<text${loop} class="images_group">`)
            }

            const upperCaseName = data.name[0].toUpperCase() + data.name.slice(1);
            $("text" + loop).append( `
            <div class="image_container" id="${data.id}">
                <a href="/profile/${data.id}">
                <img src="${data.sprites.other["official-artwork"].front_default}">
                </a>
                <div> Id: ${data.id} </div>
                <div> Name: ${upperCaseName} </div>
            </div>`)

            if (count % 3 == 0) { // only when i= 3, 6, 9
                $("main").append( `</text${loop}>`)
                loop++;
            }
        }
        if(type_g == 'grass') {
            document.getElementById(data.id).style.backgroundColor = colors.grass;
        } else if (type_g == 'electric') {
            document.getElementById(data.id).style.backgroundColor = colors.electric;
        } else if (type_g == 'water') {
            document.getElementById(data.id).style.backgroundColor = colors.water;
        } else if (type_g == 'bug') {
            document.getElementById(data.id).style.backgroundColor = colors.bug;
        } else {
            document.getElementById(data.id).style.backgroundColor = colors.fire;
        }
    }

}

function loadNew() {
    count = 0;
    for (i = 1; i < 500; i++){
        // for each pokemon
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokeResponse
        })
    }
}



function display(type_){
    $("main").empty()
    type_g = type_
    to_add = ''
    if (type_g == "random") {
        loadNineImages();
    } else {
        loadNew();
    }

}


function setup(){

    display($("#poke_type option:selected").val());

    $("#poke_type").change(() => {
        // alert($(this).attr("value"));
        poke_type = $("#poke_type option:selected").val();
        display(poke_type);


      })
}


$(document).ready(setup)
