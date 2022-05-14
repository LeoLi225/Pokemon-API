
var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

function loadEventsToMainDiv() {
    $.ajax({
        url: "http://localhost:5000/timeline/getAllEvents",
        type: "get",
        success: (r)=>{
            console.log(r)
            for( i = 0 ; i < r.length; i++  ){
                $("main").append(`<text${i} class="group">`)
                $("text" + i).append(`
                    <p> Event Text -  ${r[i].text} </p>

                    <p> Event Time - ${r[i].time} </p>

                    <p> Event Hits - ${r[i].hits} </p>
                    <button class="likeButtons" onClick="window.location.reload(true)" id="${r[i]["_id"]}"> Like! </button>
                    <button class="deleteButtons" onClick="window.location.reload(true)" id="${r[i]["_id"]}"> Delete </button>
                    `)
                $("main").append(`</text${i}>`)
            }

        }
    })
}

function increaseHits(){
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/inscreaseHits/${x}`,
        type: "get",
        success: function (x){
            console.log(x)
        }
    })
}

function deleteall() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/delete/${x}`,
        type: "get",
        success: function (x){
            console.log(x)
        }
    })
}

function setup(){
    loadEventsToMainDiv()


    $("body").on("click", ".likeButtons", increaseHits)
    $("body").on("click", ".deleteButtons", deleteall)
}



$(document).ready(setup)
