
to_add = ''

function processPokeResp(data){
    to_add += `
    <div class="image_container">
        <a href="/profile/${data.id}">
        <img src="${data.sprites.other["official-artwork"].front_default}">
        <div> Name: ${data.name} </div>
        <div> Base Experience: ${data.base_experience} </div>
        </a>
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

function setup() {
    loadNineImages();
    // events handlers
}

$(document).ready(setup)
