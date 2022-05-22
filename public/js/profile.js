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
        console.log(data);
        // document.getElementById("name").innerHTML = ${data.user};
            $("#name").append(`<div>${data.user}</div>`);
        }
    }
)