$("#logout").click(function () {
    $.ajax({
        type: "get",
        url: 'http://localhost:5000/logout',
        success: function (x) {
            console.log(x);
            window.location.href = 'http://localhost:5000';
        }
    })
})

$("#back").click(function () {

    window.location.href = 'http://localhost:5000';

})


// document.getElementById("name").innerHTML = 5 + 6;

$.ajax({
    type: "get",
    url: `http://localhost:5000/account`,
    success: function (data) {
        // document.getElementById("name").innerHTML = ${data.user};
        $("#name").append(`<div>User name:  ${data.user}</div>`);
    }
}
)

function add() {
    $.ajax({
        type: "get",
        url: `http://localhost:5000/account`,
        success: function (data) {
            console.log(data);
            loop = data.timelines.length
            for (i = 0; i < loop; i++) {
                $("#content").append(
                    `
                <div class="box0">
                    <div>Event:  ${data.timelines[i].text}</div>
                    <div>Time:  ${data.timelines[i].time}</div>
                    <button class="dButtons" onClick="window.location.reload(true)" id="${data.timelines[i].text}"> Delete </button>
                <div>
                `
                )
                $("#content").append(`</text>`)
            }
        }
    }
    )
}

function deleteb() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/delete/${x}`,
        type: "get",
        success: function (x) {
            console.log(x)
        }
    })

}

function setup() {
    add()

    $("main").on("click", ".dButtons", deleteb)
}

$(document).ready(setup)






