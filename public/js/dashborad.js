$("#logout").click(function () {
    $.ajax({
        type: "get",
        url: 'http://localhost:5000/logout',
        success: function (x) {
            console.log(x);
            window.location.href = 'http://localhost:5000/login';
        }
    })
})

$.ajax({
    type: "get",
    url: `http://localhost:5000/adminaccount`,
    success: function (data) {
        // document.getElementById("name").innerHTML = ${data.user};
        $("#name").append(`<div>User name:  ${data.user}</div>`);
    }
}
)

function adduser() {
    $.ajax({
        type: "get",
        url: `http://localhost:5000/alluser`,
        success: function (data) {

            length = data.length
            $("#content").empty()
            for (i = 0; i < length; i++) {
                $("#content").append(`
                <div class="box0">
                    <h3>User Basic</h3>
                    <div class="basic">
                        <div>UserID:  ${data[i].user}</div>
                        <input id="${data[i]._id}1" type="text" placeholder="Username" class="text" name="username" required>
                        <input type="button" href="#" class="updatename" onClick="window.location.reload(true)" id="${data[i]._id}" value="Update">
                        <div>Password:  ${data[i].pass}</div>
                        <input id="${data[i].pass}1" type="password" placeholder="Password" class="password" name="password" required>
                        <input type="button" href="#" class="updatepass" onClick="window.location.reload(true)" id="${data[i].pass}" value="Update">
                    </div>
                    <div><input type="button" href="#" class="deleteuser" onClick="window.location.reload(true)" id="${data[i].user}" value="Delete this user"></div>

                <div>
                `)
            }

        }
    }
    )
}

function addadmin() {
    $.ajax({
        type: "get",
        url: `http://localhost:5000/alladmin`,
        success: function (data) {

            length = data.length
            $("#acontent").empty()
            for (i = 0; i < length; i++) {
                $("#acontent").append(`
                <div class="box0">
                    <h3>Admin Basic</h3>
                    <div class="basic">
                        <div>UserID:  ${data[i].user}</div>
                        <div>Password:  ${data[i].pass}</div
                    </div>
                <div>
                `)
            }
        }
    }
    )
}

function userlogin() {
    $("#ulogin").empty()
    $("#ulogin").append(`
    <form class="box0">
        <div "basic">
            Username: <input id="userrr" type="text" placeholder="Username" class="text" name="username" required><br>
            Password: <input id="passss" type="password" placeholder="Password" class="password" name="password" required><br>
            <br>
            <input type="button" href="#" class="clogin" id="do-create" value="Create Account">
        </div>
        <div id="here">
        </div>

    </form>
    `)
}

function adminlogin() {
    $("#adminlogin").empty()
    $("#adminlogin").append(`
    <form class="box0">
        <div "basic">
            Admin-name: <input id="auser" type="text" placeholder="Adminname" class="text" name="username" required><br>
            Password: <input id="apass" type="password" placeholder="Password" class="password" name="password" required><br>
            <br>
            <input type="button" href="#" class="alogin" id="ado-create" value="Create Account">
        </div>
        <div id="ahere">
        </div>

    </form>
    `)
}

function alogin() {
    $.ajax({
        type: "put",
        url: `http://localhost:5000/acreate/${document.getElementById("auser").value}/${document.getElementById("apass").value}`,
        success: function (x) {
            if (x) {
                console.log(x);
                $("#ahere").append(`<br>
                <div class="alertsuccess">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                    Successfully created account.
                </div>`);
            } else {
                $("#ahere").append(`<br>
                <div class="alertfailure">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                    <p>Failed to create account.</p><p>Username and password combination is taken.</p>
                </div>`);
            }
        }
    })
}

function clogin() {
    $.ajax({
        type: "put",
        url: `http://localhost:5000/create/${document.getElementById("userrr").value}/${document.getElementById("passss").value}`,
        success: function (x) {
            if (x) {
                console.log(x);
                $("#here").append(`<br>
                <div class="alertsuccess">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                    Successfully created account.
                </div>`);
            } else {
                $("#here").append(`<br>
                <div class="alertfailure">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                    <p>Failed to create account.</p><p>Username and password combination is taken.</p>
                </div>`);
            }
        }
    })
}

function uname() {
    x = this.id
    $.ajax({
        type: "get",
        url: `http://localhost:5000/uname/${document.getElementById(`${x}1`).value}/${x}`,
        success: function (data) {
            console.log(data);
        }
    })
}

function upass() {
    x = this.id
    $.ajax({
        type: "get",
        url: `http://localhost:5000/upass/${document.getElementById(`${x}1`).value}/${x}`,
        success: function (data) {
            console.log(data);
        }
    })
}

function deleteb() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/deleteuser/${x}`,
        type: "get",
        success: function (x) {
            console.log(x)
        }
    })

}



function setup() {
    adduser()
    addadmin()
    userlogin()
    adminlogin()

    $("body").on("click", ".updatename", uname)
    $("body").on("click", ".updatepass", upass)
    $("main").on("click", ".deleteuser", deleteb)
    $("main").on("click", ".clogin", clogin)
    $("main").on("click", ".alogin", alogin)

}

$(document).ready(setup)