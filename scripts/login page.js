$(document).on("click", ".page-nav .logo", function (){

    window.location.href = window.location.protocol + "//" + window.location.host;

});

$(document).on("click", ".form .login-btn", function (){

    let json = JSON.stringify({
        "login": 1,
        "username": $(".form .form-select").val(),
        "password": $(".form #password_input").val()
    });

    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("POST",  "./php-data/login.php", true);
    xhttp3.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp3.send(json);
    xhttp3.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            var result = JSON.parse(this.responseText);
            if(result.status == "success") {
                console.log("Login is success", result);
                var login_info = result.result;
                if(login_info.depart == "security"){
                    window.location.href = window.location.protocol + "//" + window.location.host + "/security_dashboard";
                } else {
                    window.location.href = window.location.protocol + "//" + window.location.host + "/doctor_dashboard";
                }
            } else {
                console.log("Login Error : ", result.error);
            }

        }

    }

});