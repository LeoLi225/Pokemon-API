function gouser() {
    window.location.href = 'http://localhost:5000/login';
}

$("#do-login").click(function () {
    $.ajax({
        type: "get",
        url: `http://localhost:5000/adminlogin/${document.getElementById("user").value}/${document.getElementById("pass").value}`,
        success: function (data) {
            console.log(data);
            if (data) {
                window.location.href = `http://localhost:5000/pages/dashboard.html`;
            } else {
                $("#login").append(`<br><div class="alertfailure">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          Login failed.
          </div>`);
            }
        }
    })
})

